import { z } from 'zod'

export const sellerReviewDto = z.object({
	page: z.number().optional(),
	sellerId: z.string()
})

export type SellerReviewDto = z.infer<typeof sellerReviewDto>
