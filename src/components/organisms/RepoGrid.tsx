import React from 'react';
import Link from 'next/link';
import { Repository } from '@/schemas/user.schema';
import { RepoCard } from '../molecules/RepoCard';
import { ArrowRight } from 'lucide-react';

interface RepoGridProps {
  repositories: Repository[];
  limit?: number;
  showViewAll?: boolean;
}

export const RepoGrid: React.FC<RepoGridProps> = ({
  repositories,
  limit,
  showViewAll = false,
}) => {
  const displayedRepos = limit ? repositories.slice(0, limit) : repositories;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-white font-bold tracking-tight">
          {showViewAll ? 'Repositorios Destacados' : `Repositorios Públicos (${repositories.length})`}
        </h2>
        {showViewAll && (
          <Link
            href="/repositories"
            className="text-[#d0bcff] font-medium hover:underline flex items-center gap-1 text-sm"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {displayedRepos.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center text-[#cbc3d7]">
          No hay repositorios públicos disponibles para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
};
