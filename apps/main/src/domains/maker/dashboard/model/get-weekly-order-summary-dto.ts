import { z } from 'zod'

export const getWeeklyOrderSummaryDto = z.object({
	year: z.number(),
	weekNumber: z.number()
})
