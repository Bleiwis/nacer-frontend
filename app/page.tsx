'use client';

import { useUserStore } from '@/store/user.store';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserRepositories } from '@/hooks/useUserRepositories';
import { useUserLanguages } from '@/hooks/useUserLanguages';
import { DashboardTemplate } from '@/components/templates/DashboardTemplate';
import { ProfileHero } from '@/components/organisms/ProfileHero';
import { KpiGrid } from '@/components/organisms/KpiGrid';
import { RepoGrid } from '@/components/organisms/RepoGrid';
import { LanguageBreakdown } from '@/components/organisms/LanguageBreakdown';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export default function Home() {
  const currentUsername = useUserStore((state) => state.currentUsername);
  const setUsername = useUserStore((state) => state.setUsername);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
  } = useUserProfile(currentUsername);

  const {
    data: repositories = [],
    isLoading: isReposLoading,
  } = useUserRepositories(currentUsername);

  const {
    data: languages = [],
  } = useUserLanguages(currentUsername);

  const isLoading = isUserLoading || isReposLoading;

  return (
    <DashboardTemplate user={user}>
      {isLoading && (
        <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="w-10 h-10 text-[#8B5CF6] animate-spin" />
          <p className="text-[#cbc3d7] text-sm font-medium">
            Consultando información de GitHub para @{currentUsername}...
          </p>
        </div>
      )}

      {isUserError && (
        <div className="glass rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] space-y-4 border-[#ffb4ab]/40">
          <AlertCircle className="w-12 h-12 text-[#ffb4ab]" />
          <h2 className="text-xl font-bold text-white">Error al cargar datos</h2>
          <p className="text-[#cbc3d7] text-sm max-w-md text-center">
            {userError?.message || 'No se pudo consultar el usuario especificado en la API de NestJS.'}
          </p>
          <div className="flex gap-4 pt-2">
            <Button variant="gradient" onClick={() => refetchUser()}>
              Reintentar
            </Button>
            <Button variant="glass" onClick={() => setUsername('bleiwis')}>
              Ver perfil principal (@bleiwis)
            </Button>
          </div>
        </div>
      )}

      {user && !isLoading && (
        <>
          <ProfileHero user={user} />
          <KpiGrid user={user} />
          <LanguageBreakdown languages={languages} />
          <RepoGrid repositories={repositories} limit={6} showViewAll={true} />
        </>
      )}
    </DashboardTemplate>
  );
}
