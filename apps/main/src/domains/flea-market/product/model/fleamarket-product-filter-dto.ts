import { z } from 'zod'

export const fleamarketProductFilterDto = z.object({
	categorySlug: z.string().optional(),
	excludeSoldout: z.boolean().optional(),
	sortBy: z.string().optional(),
	page: z.number().optional(),
	tradeTypeBy: z.string().optional()
})

export type FleamarketProductFilterDto = z.infer<
	typeof fleamarketProductFilterDto
>
