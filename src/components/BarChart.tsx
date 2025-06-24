import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  title: string;
  dataKey: string;
  nameKey: string;
  color?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title, 
  dataKey, 
  nameKey, 
  color = '#8b5cf6' 
}) => {
  const formatValue = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-400">Tidak ada data untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6
                    transition-all duration-300 ease-in-out 
                    hover:scale-105 hover:-translate-y-2 hover:border-green-400">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={formatValue}
            />
            <YAxis 
              type="category" 
              dataKey={nameKey} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              width={75}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => [formatValue(value), title.includes('Streams') ? 'Streams' : 'Tracks']}
            />
            <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};