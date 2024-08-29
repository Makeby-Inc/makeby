import { z } from 'zod'

export const phoneUpdateDto = z.object({
	phoneNumber: z.string()
})
export type PhoneUpdateDto = z.infer<typeof phoneUpdateDto>
