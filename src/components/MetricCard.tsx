import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        {icon && <div className="text-purple-400">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
    </div>
  );
};