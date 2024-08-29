import { z } from 'zod'

export const messageCreateDto = z.object({
	chatRoomId: z.string(),
	receiverUserId: z.string(),
	text: z.string().max(1000).optional(),
	images: z.array(z.string()).optional()
})

export type MessageCreateDto = z.infer<typeof messageCreateDto>
