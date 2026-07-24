'use client';

import React, { useState, useMemo } from 'react';
import { useUserStore } from '@/store/user.store';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserRepositories } from '@/hooks/useUserRepositories';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { RepoCard } from '@/components/molecules/RepoCard';
import { Loader2, AlertCircle, Search, Plus } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export default function RepositoriesPage() {
  const currentUsername = useUserStore((state) => state.currentUsername);
  const setUsername = useUserStore((state) => state.setUsername);

  const { data: user } = useUserProfile(currentUsername);
  const {
    data: repositories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useUserRepositories(currentUsername);

  const [searchFilter, setSearchFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Last updated');

  const languages = useMemo(() => {
    const set = new Set<string>();
    repositories.forEach((repo) => {
      if (repo.language) set.add(repo.language);
    });
    return Array.from(set);
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    return repositories
      .filter((repo) => {
        const matchesSearch =
          repo.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          (repo.description &&
            repo.description
              .toLowerCase()
              .includes(searchFilter.toLowerCase()));

        const matchesLanguage =
          languageFilter === 'All' || repo.language === languageFilter;

        return matchesSearch && matchesLanguage;
      })
      .sort((a, b) => {
        if (sortOrder === 'Name') {
          return a.name.localeCompare(b.name);
        }
        if (sortOrder === 'Stars') {
          return b.stargazersCount - a.stargazersCount;
        }
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
  }, [repositories, searchFilter, languageFilter, sortOrder]);

  return (
    <DashboardTemplate user={user}>
      {/* Repositories Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl text-white font-bold tracking-tight">
            Repositorios
          </h1>
          <p className="text-[#cbc3d7] mt-1 text-xs tracking-wider">
            <span className="text-[#d0bcff] font-bold">{repositories.length}</span> REPOSITORIOS TOTALES ADMINISTRADOS PARA @{currentUsername.toUpperCase()}
          </p>
        </div>
        <div className="flex gap-2">
          <a href="https://github.com/new" target="_blank" rel="noreferrer">
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              NUEVO REPOSITORIO
            </Button>
          </a>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <section className="glass p-4 rounded-xl mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Buscar un repositorio..."
              className="w-full bg-[#181b25] border border-[#30363D]/40 text-white rounded-lg px-4 py-2 pl-11 text-sm outline-none focus:border-[#8B5CF6] transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#cbc3d7]" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Filter */}
            <div className="relative">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="appearance-none bg-[#181b25] border border-[#30363D]/40 rounded-lg px-4 py-2 pr-8 text-xs font-medium text-[#cbc3d7] focus:border-[#8B5CF6] transition-colors cursor-pointer outline-none min-w-[130px]"
              >
                <option value="All">Lenguaje: Todos</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-[#181b25] border border-[#30363D]/40 rounded-lg px-4 py-2 pr-8 text-xs font-medium text-[#cbc3d7] focus:border-[#8B5CF6] transition-colors cursor-pointer outline-none min-w-[170px]"
              >
                <option value="Last updated">Orden: Última actualización</option>
                <option value="Name">Orden: Nombre</option>
                <option value="Stars">Orden: Estrellas</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <Loader2 className="w-10 h-10 text-[#8B5CF6] animate-spin" />
          <p className="text-[#cbc3d7] text-sm">
            Cargando repositorios públicos para @{currentUsername}...
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] space-y-4 border-[#ffb4ab]/40">
          <AlertCircle className="w-12 h-12 text-[#ffb4ab]" />
          <h2 className="text-xl font-bold text-white">
            Error al obtener repositorios
          </h2>
          <p className="text-[#cbc3d7] text-sm max-w-md text-center">
            {error?.message ||
              'No se pudieron consultar los repositorios en la API.'}
          </p>
          <div className="flex gap-4 pt-2">
            <Button variant="gradient" onClick={() => refetch()}>
              Reintentar
            </Button>
            <Button variant="glass" onClick={() => setUsername('bleiwis')}>
              Ver perfil principal (@bleiwis)
            </Button>
          </div>
        </div>
      )}

      {/* Repositories Grid */}
      {!isLoading && !isError && (
        <>
          {filteredRepositories.length === 0 ? (
            <div className="glass p-8 rounded-xl text-center text-[#cbc3d7]">
              No se encontraron repositorios que coincidan con la búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredRepositories.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          )}
        </>
      )}
    </DashboardTemplate>
  );
}
