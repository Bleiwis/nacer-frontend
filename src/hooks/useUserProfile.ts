import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { UserProfile, userProfileSchema } from '@/schemas/user.schema';

export function useUserProfile(username: string) {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', username],
    queryFn: async () => {
      const response = await apiClient.get<UserProfile>(`/user/${username}`);
      return userProfileSchema.parse(response.data);
    },
    enabled: Boolean(username),
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
