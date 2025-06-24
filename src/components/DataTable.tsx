import React from 'react';
import { SpotifyTrack } from '../types/spotify';

interface DataTableProps {
  data: SpotifyTrack[];
  title: string;
}

export const DataTable: React.FC<DataTableProps> = ({ data, title }) => {
  const formatStreams = (streams: number) => {
    if (streams >= 1000000000) {
      return `${(streams / 1000000000).toFixed(1)}B`;
    } else if (streams >= 1000000) {
      return `${(streams / 1000000).toFixed(1)}M`;
    } else if (streams >= 1000) {
      return `${(streams / 1000).toFixed(1)}K`;
    }
    return streams.toString();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                    transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:-translate-y-2 hover:border-green-400">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-2 text-gray-400 font-medium">#</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Track</th>
              <th className="text-left py-3 px-2 text-gray-400 font-medium">Artist</th>
              <th className="text-right py-3 px-2 text-gray-400 font-medium">Streams</th>
            </tr>
          </thead>
          <tbody>
            {data.map((track, index) => (
              <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-2 text-gray-500 font-mono">{index + 1}</td>
                <td className="py-3 px-2 text-white font-medium max-w-xs truncate">{track.track_name}</td>
                <td className="py-3 px-2 text-gray-300 max-w-xs truncate">{track['artist(s)_name']}</td>
                <td className="py-3 px-2 text-right text-green-400 font-mono">{formatStreams(track.streams)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};