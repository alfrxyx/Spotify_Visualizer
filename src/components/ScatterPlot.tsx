import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SpotifyTrack } from '../types/spotify';

interface ScatterPlotProps {
  data: SpotifyTrack[];
  title: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return (
      // Blok ini sudah benar
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                      transition-all duration-300 ease-in-out 
                      hover:scale-105 hover:-translate-y-2 hover:border-green-400">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-400">Tidak ada data untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  const scatterData = data.slice(0, 100).map(track => ({
    valence: track['valence_%'] || 0,
    danceability: track['danceability_%'] || 0,
    track: track.track_name || 'Unknown',
    artist: track['artist(s)_name'] || 'Unknown',
  })).filter(item => item.valence > 0 && item.danceability > 0);

  return (
    // 👇 WARNA BORDER DI BLOK INI JUGA DIUBAH MENJADI HIJAU 👇
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                    transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:-translate-y-2 hover:border-green-400">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">
        Ternyata, lagu hits 2023 punya beat asyik untuk bergoyang, namun dengan nuansa yang sedikit melankolis.
      </p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="valence" 
              name="Valence %" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{ value: 'Valence %', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#9ca3af' } }}
            />
            <YAxis 
              type="number" 
              dataKey="danceability" 
              name="Danceability %" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              label={{ value: 'Danceability %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
                      <p className="text-white font-medium">{data.track}</p>
                      <p className="text-gray-300 text-sm">{data.artist}</p>
                      <p className="text-green-400">Valence: {data.valence}%</p>
                      <p className="text-pink-400">Danceability: {data.danceability}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={scatterData} fill="#1ed760" fillOpacity={0.7} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};