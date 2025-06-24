import React from 'react';
import { Filter, Calendar, User, Music } from 'lucide-react';

interface FilterControlsProps {
  filters: {
    year: string;
    artist: string;
    minStreams: string;
  };
  onFilterChange: (key: string, value: string) => void;
  availableArtists: string[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  availableArtists,
}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8 
                    transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:-translate-y-2 hover:border-green-400">
      
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Filter Data</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Tahun Rilis
          </label>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Semua Tahun</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        {/* Artist Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            Artis
          </label>
          <select
            value={filters.artist}
            onChange={(e) => onFilterChange('artist', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Semua Artis</option>
            {availableArtists.map((artist) => (
              <option key={artist} value={artist}>
                {artist.length > 25 ? artist.substring(0, 25) + '...' : artist}
              </option>
            ))}
          </select>
        </div>

        {/* Min Streams Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Music className="h-4 w-4 inline mr-1" />
            Min. Streams (Juta)
          </label>
          <select
            value={filters.minStreams}
            onChange={(e) => onFilterChange('minStreams', e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Semua</option>
            <option value="100000000">100M+</option>
            <option value="500000000">500M+</option>
            <option value="1000000000">1B+</option>
          </select>
        </div>
      </div>
    </div>
  );
};