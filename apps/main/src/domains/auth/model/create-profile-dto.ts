import { z } from 'zod'

export const createProfileDto = z.object({
	image: z.string(),
	name: z.string(),
	phoneNumber: z.string(),
	birthDate: z.string(),
	isMarketingSubscribed: z.boolean()
})
export type CreateProfileDto = z.infer<typeof createProfileDto>
