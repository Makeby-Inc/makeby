import { z } from 'zod'

export const chatroomCreateDto = z.object({
	fleaMarketProductId: z.string(),
	receiverUserId: z.string()
})

export type ChatroomCreateDto = z.infer<typeof chatroomCreateDto>
