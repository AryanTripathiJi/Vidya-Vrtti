import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
  onClick?: () => void;
  active?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = 'up',
  icon: Icon,
  iconBgColor = 'bg-blue-50',
  iconTextColor = 'text-blue-700',
  onClick,
  active = false
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl border p-5 transition-all duration-200 shadow-xs ${
        onClick ? 'cursor-pointer hover:shadow-md hover:border-slate-300' : ''
      } ${active ? 'ring-2 ring-[#c9b79c] border-transparent' : 'border-[#c9b79c]'}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">{value}</h3>

          {(change || subtitle) && (
            <div className="flex items-center space-x-1.5 mt-2">
              {change && (
                <span
                  className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-xs ${
                    trend === 'up'
                      ? 'bg-emerald-50 text-emerald-700'
                      : trend === 'down'
                      ? 'bg-rose-50 text-rose-700'
                      : 'bg-[#e8d6ba] text-slate-600'
                  }`}
                >
                  {trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : trend === 'down' ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : null}
                  {change}
                </span>
              )}
              {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
            </div>
          )}
        </div>

        <div className={`p-3 rounded-lg ${iconBgColor} ${iconTextColor} shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
