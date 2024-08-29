import { z } from 'zod'

export const imageUpdateDto = z.object({
	image: z.string()
})
export type ImageUpdateDto = z.infer<typeof imageUpdateDto>
