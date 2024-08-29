import { z } from 'zod'

export const deleteRoomDto = z.object({
	roomId: z.string()
})
