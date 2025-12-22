import { z } from 'zod'

export const reviewFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(50),
  rating: z.number().min(1),
})

export type ReviewFormValidated = z.infer<typeof reviewFormSchema>
