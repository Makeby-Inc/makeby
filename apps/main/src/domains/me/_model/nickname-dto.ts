import { z } from 'zod'

export const nicknameUpdateDto = z.object({
	name: z.string()
})
export type NicknameUpdateDto = z.infer<typeof nicknameUpdateDto>
