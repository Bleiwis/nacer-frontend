import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';
import { Repository, repositorySchema } from '@/schemas/user.schema';

export function useUserRepositories(username: string) {
  return useQuery<Repository[], Error>({
    queryKey: ['userRepositories', username],
    queryFn: async () => {
      const response = await apiClient.get<Repository[]>(`/user/${username}/repos`);
      return z.array(repositorySchema).parse(response.data);
    },
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
