import * as z from 'zod'

export const socialDto = z.object({
	id: z.string(),
	socialType: z.enum(['X', 'INSTAGRAM', 'NAVER']),
	socialId: z.string()
})
export type SocialData = z.infer<typeof socialDto>
