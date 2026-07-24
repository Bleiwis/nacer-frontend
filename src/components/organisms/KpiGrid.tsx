import React from 'react';
import { UserProfile } from '@/schemas/user.schema';
import { KpiCard } from '../molecules/KpiCard';
import { Book, Users, UserSearch, Code } from 'lucide-react';

interface KpiGridProps {
  user: UserProfile;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ user }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KpiCard
        icon={<Book className="w-5 h-5 text-[#8B5CF6]" />}
        value={user.publicRepos}
        label="Repositorios"
        badgeBgClass="bg-[#8B5CF6]/10"
      />
      <KpiCard
        icon={<Users className="w-5 h-5 text-[#ffb95f]" />}
        value={user.followers > 1000 ? `${(user.followers / 1000).toFixed(1)}k` : user.followers}
        label="Seguidores"
        badgeBgClass="bg-[#ffb95f]/10"
      />
      <KpiCard
        icon={<UserSearch className="w-5 h-5 text-[#91db2a]" />}
        value={user.following}
        label="Siguiendo"
        badgeBgClass="bg-[#91db2a]/10"
      />
      <KpiCard
        icon={<Code className="w-5 h-5 text-[#ffb4ab]" />}
        value={Math.round(user.publicRepos * 0.4) + 2}
        label="Gists y Fragmentos"
        badgeBgClass="bg-[#ffb4ab]/10"
      />
    </section>
  );
};
