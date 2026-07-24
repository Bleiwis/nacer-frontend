import React from 'react';
import { LanguageUsage } from '@/schemas/user.schema';
import { Card } from '../atoms/Card';

interface LanguageBreakdownProps {
  languages: LanguageUsage[];
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#DEA584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  PHP: '#4F5D95',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
};

export const LanguageBreakdown: React.FC<LanguageBreakdownProps> = ({
  languages,
}) => {
  if (languages.length === 0) return null;

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-bold text-lg tracking-tight">
          Lenguajes de Programación Más Utilizados
        </h3>
        <span className="text-xs text-[#cbc3d7]">
          Basado en repositorios públicos
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#181b25]">
        {languages.map((item) => (
          <div
            key={item.language}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: languageColors[item.language] || '#8B5CF6',
            }}
            className="h-full transition-all duration-500"
            title={`${item.language}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Legend List */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
        {languages.map((item) => {
          const color = languageColors[item.language] || '#8B5CF6';
          return (
            <div key={item.language} className="flex items-center gap-2 text-xs text-[#cbc3d7]">
              <span
                className="w-3 h-3 rounded-full inline-block shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium text-white">{item.language}</span>
              <span className="opacity-70">({item.percentage}%)</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
