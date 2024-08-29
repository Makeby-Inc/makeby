import { z } from 'zod'

export const fleamarketReviewCreateDto = z.object({
	fleaMarketProductId: z.string(),
	score: z.number(),
	content: z.string(),
	reviewImages: z.array(z.string()).optional(),
	reviewerName: z.string(),
	sellerId: z.string(),
	productTitle: z.string()
})

export type FleamarketReviewCreateDto = z.infer<
	typeof fleamarketReviewCreateDto
>
