import React from 'react';
import { ApplicationStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Award, Sparkles, FileText, Send } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          bg: 'bg-[#e8d6ba] text-slate-700 border-slate-300',
          icon: FileText
        };
      case 'submitted':
        return {
          label: 'Submitted',
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Send
        };
      case 'under_verification':
        return {
          label: 'Under Verification',
          bg: 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse',
          icon: Clock
        };
      case 'query_raised':
        return {
          label: 'Deficiency Raised',
          bg: 'bg-rose-100 text-rose-800 border-rose-300 font-semibold',
          icon: AlertTriangle
        };
      case 'verified':
        return {
          label: 'Verified',
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          icon: CheckCircle2
        };
      case 'scrutinized':
        return {
          label: 'Scrutinized',
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-300',
          icon: Sparkles
        };
      case 'selected':
        return {
          label: 'Merit Selected',
          bg: 'bg-purple-100 text-purple-800 border-purple-300 font-bold',
          icon: Award
        };
      case 'rejected':
        return {
          label: 'Rejected',
          bg: 'bg-red-50 text-red-700 border-red-200',
          icon: XCircle
        };
      case 'disbursed':
        return {
          label: 'Disbursed',
          bg: 'bg-teal-100 text-teal-800 border-teal-300 font-semibold',
          icon: CheckCircle2
        };
      default:
        return {
          label: status,
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: FileText
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 space-x-2 font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-all ${config.bg} ${sizeClasses[size]}`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{config.label}</span>
    </span>
  );
};
