import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ArtistComparisonProps {
  artist1: {
    name: string;
    stats: { valence: number; energy: number; bpm: number };
    trackCount: number;
  };
  artist2: {
    name: string;
    stats: { valence: number; energy: number; bpm: number };
    trackCount: number;
  };
}

export const ArtistComparison: React.FC<ArtistComparisonProps> = ({ artist1, artist2 }) => {
  if (!artist1.trackCount && !artist2.trackCount) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">DNA Musik: Taylor Swift vs Olivia Rodrigo</h3>
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-400">Data artis tidak ditemukan dalam filter saat ini</p>
        </div>
      </div>
    );
  }

  const comparisonData = [
    {
      feature: 'Valence',
      [artist1.name]: artist1.stats.valence || 0,
      [artist2.name]: artist2.stats.valence || 0,
    },
    {
      feature: 'Energy',
      [artist1.name]: artist1.stats.energy || 0,
      [artist2.name]: artist2.stats.energy || 0,
    },
    {
      feature: 'BPM',
      [artist1.name]: Math.round(artist1.stats.bpm) || 0,
      [artist2.name]: Math.round(artist2.stats.bpm) || 0,
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                    transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:-translate-y-2 hover:border-green-400">
      <h3 className="text-xl font-bold text-white mb-2">🎵 DNA Musik: Taylor Swift vs Olivia Rodrigo</h3>
      <p className="text-gray-400 text-sm mb-4">
        Data menunjukkan bahwa Olivia Rodrigo punya nilai valence dan tempo (BPM) yang lebih tinggi.
        Namun, lagu-lagunya memang cenderung lebih mellow karena memiliki tingkat energy yang lebih rendah
        dibandingkan Taylor Swift — cocok buat nangis di pojokan kamar.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-pink-400 font-medium">{artist1.name}</p>
          <p className="text-gray-400 text-sm">{artist1.trackCount} tracks</p>
        </div>
        <div className="text-center">
          <p className="text-green-400 font-medium">{artist2.name}</p>
          <p className="text-gray-400 text-sm">{artist2.trackCount} tracks</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="feature" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Bar dataKey={artist1.name} fill="#ec4899 " radius={[4, 4, 0, 0]} />
            <Bar dataKey={artist2.name} fill="#1ed760" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};