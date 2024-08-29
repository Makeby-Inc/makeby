import { z } from 'zod'

export const getMonthlyOrderSummaryDto = z.object({
	year: z.number(),
	month: z.number()
})
