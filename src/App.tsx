import React, { useState, useMemo } from 'react';
import { Music, TrendingUp, Users, Zap, Heart, BarChart3 } from 'lucide-react';
import { useSpotifyData } from './hooks/useSpotifyData';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import { BarChart } from './components/BarChart';
import { ScatterPlot } from './components/ScatterPlot';
import { ArtistComparison } from './components/ArtistComparison';
import { FilterControls } from './components/FilterControls';
import {
  getTopTracks,
  getArtistStats,
  getTopArtistsByStreams,
  getTopArtistsByTrackCount,
  getAverageStats,
  getArtistComparison,
  getAvailableArtists,
  applyFilters,
} from './utils/dataProcessor';

function App() {
  const { data: rawData, loading, error } = useSpotifyData();
  
  const [filters, setFilters] = useState({
    year: '',
    artist: '',
    minStreams: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return applyFilters(rawData, filters);
  }, [rawData, filters]);

  const availableArtists = useMemo(() => {
    return getAvailableArtists(rawData);
  }, [rawData]);

  const processedData = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        topTracks: [],
        artistStats: [],
        topArtistsByStreams: [],
        topArtistsByTracks: [],
        averageStats: { avgBpm: 0, avgValence: 0, avgEnergy: 0 },
        artistComparison: {
          artist1: { name: 'Taylor Swift', stats: { valence: 0, energy: 0, bpm: 0 }, trackCount: 0 },
          artist2: { name: 'Olivia Rodrigo', stats: { valence: 0, energy: 0, bpm: 0 }, trackCount: 0 },
        },
      };
    }

    const topTracks = getTopTracks(filteredData, 10);
    const artistStats = getArtistStats(filteredData);
    const topArtistsByStreams = getTopArtistsByStreams(artistStats, 10);
    const topArtistsByTracks = getTopArtistsByTrackCount(artistStats, 10);
    const averageStats = getAverageStats(filteredData);
    const artistComparison = getArtistComparison(filteredData, 'Taylor Swift', 'Olivia Rodrigo');

    return {
      topTracks,
      artistStats,
      topArtistsByStreams,
      topArtistsByTracks,
      averageStats,
      artistComparison,
    };
  }, [filteredData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Spotify 2023 data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  const { topTracks, topArtistsByStreams, topArtistsByTracks, averageStats, artistComparison } = processedData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 backdrop-blur-sm bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Music className="h-8 w-8 text-purple-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                🎧 Streaming Showdown 2023
              </h1>
              <p className="text-gray-400 mt-1">Siapa Menguasai Telinga Dunia?</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          availableArtists={availableArtists}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Rata-rata BPM"
            value={averageStats.avgBpm}
            subtitle="Beats per minute"
            icon={<Zap className="h-5 w-5" />}
          />
          <MetricCard
            title="Rata-rata Valence"
            value={`${averageStats.avgValence}%`}
            subtitle="Tingkat kebahagiaan"
            icon={<Heart className="h-5 w-5" />}
          />
          <MetricCard
            title="Rata-rata Energy"
            value={`${averageStats.avgEnergy}%`}
            subtitle="Tingkat energi"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Data Summary */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-8">
          <p className="text-gray-300 text-sm">
            📊 Menampilkan <span className="text-green-400 font-semibold">{filteredData.length}</span> lagu 
            {filters.year && ` dari tahun ${filters.year}`}
            {filters.artist && ` oleh artis yang mengandung "${filters.artist}"`}
            {filters.minStreams && ` dengan minimal ${parseInt(filters.minStreams) / 1000000}M streams`}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <DataTable 
              data={topTracks} 
              title="🏆 Top Lagu Streaming 2023" 
            />
            
            <BarChart
              data={topArtistsByStreams.map(artist => ({
                artist: artist.artist.length > 15 ? artist.artist.substring(0, 15) + '...' : artist.artist,
                totalStreams: artist.totalStreams,
              }))}
              title="👑 Total Streams per Artis"
              dataKey="totalStreams"
              nameKey="artist"
              color="#1ed760"
            />

            <BarChart
              data={topArtistsByTracks.map(artist => ({
                artist: artist.artist.length > 15 ? artist.artist.substring(0, 15) + '...' : artist.artist,
                trackCount: artist.trackCount,
              }))}
              title="🎵 Jumlah Lagu Hits per Artis"
              dataKey="trackCount"
              nameKey="artist"
              color="#ec4899"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ScatterPlot 
              data={filteredData} 
              title="🎉 Pesta Perasaan Musik" 
            />

            <ArtistComparison
              artist1={artistComparison.artist1}
              artist2={artistComparison.artist2}
            />

            {/* Insight Card */}
            <div className="bg-gradient-to-r from-blue-950/50 to-blue-800/50 backdrop-blur-sm border border-purple-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">💡 Insight Menarik</h3>
              </div>
              <div className="space-y-3 text-gray-300">
                {topTracks.length > 0 ? (
                  <>
                    <p>
                      🎯 <strong className="text-white">Lagu terpopuler:</strong> "{topTracks[0]?.track_name}" 
                      dengan {(topTracks[0]?.streams / 1000000).toFixed(1)}M streams
                    </p>
                    <p>
                      🎤 <strong className="text-white">Raja streaming:</strong> {topArtistsByStreams[0]?.artist} 
                      mendominasi dengan total {(topArtistsByStreams[0]?.totalStreams / 1000000000).toFixed(1)}B streams
                    </p>
                    <p>
                      🎵 <strong className="text-white">Produktif:</strong> {topArtistsByTracks[0]?.artist} 
                      paling banyak lagu hits ({topArtistsByTracks[0]?.trackCount} tracks)
                    </p>
                  </>
                ) : (
                  <p>🔍 Tidak ada data yang sesuai dengan filter saat ini. Coba ubah pengaturan filter.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Data: Spotify Top Songs 2023 | Dashboard dibuat oleh Alfarabi Gazali Sati & M Ikbal Alfarizi</p>
        </footer>
      </main>
    </div>
  );
}

export default App;