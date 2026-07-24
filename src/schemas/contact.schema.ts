import { z } from 'zod';

export const contactFormSchema = z.object({
  subject: z.string().min(2, 'El asunto es obligatorio'),
  message: z.string().min(5, 'El mensaje debe contener al menos 5 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
