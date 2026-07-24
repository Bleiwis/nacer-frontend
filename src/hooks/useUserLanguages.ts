import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { apiClient } from '@/lib/api-client';
import { LanguageUsage, languageUsageSchema } from '@/schemas/user.schema';

export function useUserLanguages(username: string) {
  return useQuery<LanguageUsage[], Error>({
    queryKey: ['userLanguages', username],
    queryFn: async () => {
      const response = await apiClient.get<LanguageUsage[]>(`/user/${username}/languages`);
      return z.array(languageUsageSchema).parse(response.data);
    },
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
