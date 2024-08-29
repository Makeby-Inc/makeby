import { z } from 'zod'

export const productFilterDto = z.object({
	shopSlug: z.string().optional(),
	categorySlug: z.string().optional(),
	excludeSoldout: z.boolean().optional(),
	sortBy: z.string().optional(),
	page: z.number().optional()
})

export type ProductFilterDto = z.infer<typeof productFilterDto>
