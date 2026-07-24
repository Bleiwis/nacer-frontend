import { z } from 'zod';

export const userProfileSchema = z.object({
  username: z.string(),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  avatarUrl: z.string().url(),
  profileUrl: z.string().url(),
  publicRepos: z.number(),
  followers: z.number(),
  following: z.number(),
  location: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

export const repositorySchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  htmlUrl: z.string().url(),
  language: z.string().nullable().optional(),
  stargazersCount: z.number(),
  forksCount: z.number(),
  updatedAt: z.string(),
  isPrivate: z.boolean(),
});

export type Repository = z.infer<typeof repositorySchema>;

export const languageUsageSchema = z.object({
  language: z.string(),
  count: z.number(),
  percentage: z.number(),
});

export type LanguageUsage = z.infer<typeof languageUsageSchema>;

export const searchUserSchema = z.object({
  username: z.string().min(1, 'Ingresa un usuario válido'),
});

export type SearchUserFormData = z.infer<typeof searchUserSchema>;
