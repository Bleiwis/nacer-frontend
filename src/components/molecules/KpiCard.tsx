import React from 'react';

interface KpiCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  badgeBgClass?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  icon,
  value,
  label,
  badgeBgClass = 'bg-[#8B5CF6]/10',
}) => {
  return (
    <div className="glass glass-hover p-6 rounded-xl flex flex-col items-center justify-center text-center transition-all">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${badgeBgClass}`}
      >
        {icon}
      </div>
      <div className="text-3xl text-white font-bold mb-1">{value}</div>
      <div className="text-[#cbc3d7] text-xs font-medium uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};
