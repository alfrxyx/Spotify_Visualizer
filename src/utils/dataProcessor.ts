import { SpotifyTrack, ArtistStats } from '../types/spotify';

export const processSpotifyData = (data: any[]): SpotifyTrack[] => {
  // Clean and convert data
  const cleanedData = data.map(track => ({
    ...track,
    streams: parseInt(track.streams?.toString().replace(/,/g, '') || '0'),
    'danceability_%': parseFloat(track['danceability_%']?.toString() || '0'),
    'valence_%': parseFloat(track['valence_%']?.toString() || '0'),
    'energy_%': parseFloat(track['energy_%']?.toString() || '0'),
    bpm: parseFloat(track.bpm?.toString() || '0'),
    released_year: parseInt(track.released_year?.toString() || '0'),
  })).filter(track => track.streams > 0 && track.track_name && track['artist(s)_name']);

  return cleanedData;
};

export const applyFilters = (data: SpotifyTrack[], filters: any): SpotifyTrack[] => {
  return data.filter(track => {
    // Year filter
    if (filters.year && track.released_year.toString() !== filters.year) {
      return false;
    }
    
    // Artist filter
    if (filters.artist && !track['artist(s)_name'].toLowerCase().includes(filters.artist.toLowerCase())) {
      return false;
    }
    
    // Min streams filter
    if (filters.minStreams && track.streams < parseInt(filters.minStreams)) {
      return false;
    }
    
    return true;
  });
};

export const getTopTracks = (data: SpotifyTrack[], limit = 10) => {
  return data
    .sort((a, b) => b.streams - a.streams)
    .slice(0, limit);
};

export const getArtistStats = (data: SpotifyTrack[]): ArtistStats[] => {
  const artistMap = new Map<string, {
    totalStreams: number;
    trackCount: number;
    valenceSum: number;
    energySum: number;
    bpmSum: number;
  }>();

  data.forEach(track => {
    const artist = track['artist(s)_name'];
    if (!artistMap.has(artist)) {
      artistMap.set(artist, {
        totalStreams: 0,
        trackCount: 0,
        valenceSum: 0,
        energySum: 0,
        bpmSum: 0,
      });
    }

    const stats = artistMap.get(artist)!;
    stats.totalStreams += track.streams;
    stats.trackCount += 1;
    stats.valenceSum += track['valence_%'];
    stats.energySum += track['energy_%'];
    stats.bpmSum += track.bpm;
  });

  return Array.from(artistMap.entries()).map(([artist, stats]) => ({
    artist,
    totalStreams: stats.totalStreams,
    trackCount: stats.trackCount,
    avgValence: stats.valenceSum / stats.trackCount,
    avgEnergy: stats.energySum / stats.trackCount,
    avgBpm: stats.bpmSum / stats.trackCount,
  }));
};

export const getTopArtistsByStreams = (artistStats: ArtistStats[], limit = 10) => {
  return artistStats
    .sort((a, b) => b.totalStreams - a.totalStreams)
    .slice(0, limit);
};

export const getTopArtistsByTrackCount = (artistStats: ArtistStats[], limit = 10) => {
  return artistStats
    .sort((a, b) => b.trackCount - a.trackCount)
    .slice(0, limit);
};

export const getAverageStats = (data: SpotifyTrack[]) => {
  if (data.length === 0) {
    return { avgBpm: 0, avgValence: 0, avgEnergy: 0 };
  }

  const total = data.length;
  const sums = data.reduce(
    (acc, track) => ({
      bpm: acc.bpm + (track.bpm || 0),
      valence: acc.valence + (track['valence_%'] || 0),
      energy: acc.energy + (track['energy_%'] || 0),
    }),
    { bpm: 0, valence: 0, energy: 0 }
  );

  return {
    avgBpm: Math.round(sums.bpm / total),
    avgValence: Math.round(sums.valence / total),
    avgEnergy: Math.round(sums.energy / total),
  };
};

export const getArtistComparison = (data: SpotifyTrack[], artist1: string, artist2: string) => {
  const artist1Tracks = data.filter(track => 
    track['artist(s)_name'].toLowerCase().includes(artist1.toLowerCase())
  );
  const artist2Tracks = data.filter(track => 
    track['artist(s)_name'].toLowerCase().includes(artist2.toLowerCase())
  );

  const getArtistAvg = (tracks: SpotifyTrack[]) => {
    if (tracks.length === 0) return { valence: 0, energy: 0, bpm: 0 };
    
    const sums = tracks.reduce(
      (acc, track) => ({
        valence: acc.valence + (track['valence_%'] || 0),
        energy: acc.energy + (track['energy_%'] || 0),
        bpm: acc.bpm + (track.bpm || 0),
      }),
      { valence: 0, energy: 0, bpm: 0 }
    );

    return {
      valence: Math.round(sums.valence / tracks.length),
      energy: Math.round(sums.energy / tracks.length),
      bpm: Math.round(sums.bpm / tracks.length),
    };
  };

  return {
    artist1: {
      name: artist1,
      stats: getArtistAvg(artist1Tracks),
      trackCount: artist1Tracks.length,
    },
    artist2: {
      name: artist2,
      stats: getArtistAvg(artist2Tracks),
      trackCount: artist2Tracks.length,
    },
  };
};

export const getAvailableArtists = (data: SpotifyTrack[]): string[] => {
  const artists = new Set<string>();
  data.forEach(track => {
    if (track['artist(s)_name']) {
      artists.add(track['artist(s)_name']);
    }
  });
  return Array.from(artists).sort();
};