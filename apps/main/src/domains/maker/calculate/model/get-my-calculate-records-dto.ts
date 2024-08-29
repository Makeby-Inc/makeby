import { z } from 'zod'

export const getMyCalculateRecordsDto = z.object({
	year: z.number(),
	month: z.number(),
	productId: z.string().optional().nullable()
})
