import React from 'react';
import { Repository } from '@/schemas/user.schema';
import { Badge } from '../atoms/Badge';
import { Card } from '../atoms/Card';
import { Book, Star, GitFork, ExternalLink } from 'lucide-react';

interface RepoCardProps {
  repo: Repository;
}

const languageColors: Record<string, string> = {
  Rust: '#DEA584',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
};

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const dotColor = repo.language ? languageColors[repo.language] || '#8B5CF6' : '#8B5CF6';

  return (
    <Card>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-[#cbc3d7] shrink-0" />
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white text-lg font-medium hover:text-[#8B5CF6] transition-colors flex items-center gap-1 group-hover:underline"
            >
              {repo.name}
              <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
          <Badge variant="outline">{repo.isPrivate ? 'Privado' : 'Público'}</Badge>
        </div>

        <p className="text-[#cbc3d7] text-sm line-clamp-2 min-h-[40px] leading-relaxed">
          {repo.description || 'Sin descripción disponible.'}
        </p>
      </div>

      <div className="flex items-center gap-6 pt-3 text-xs text-[#cbc3d7] border-t border-[#30363D]/20">
        {repo.language && (
          <div className="flex items-center gap-1.5 font-medium">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: dotColor }}
            />
            <span>{repo.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1 font-medium">
          <Star className="w-4 h-4 text-[#cbc3d7]" />
          <span>{repo.stargazersCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1 font-medium">
          <GitFork className="w-4 h-4 text-[#cbc3d7]" />
          <span>{repo.forksCount.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};
