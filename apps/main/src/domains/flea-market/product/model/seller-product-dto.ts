import { z } from 'zod'

export const sellerProductDto = z.object({
	page: z.number().optional(),
	sellerId: z.string(),
	productStatusBy: z.string().optional()
})

export type SellerProductDto = z.infer<typeof sellerProductDto>
