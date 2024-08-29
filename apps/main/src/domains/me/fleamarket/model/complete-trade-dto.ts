import { z } from 'zod'

export const completeTradeDto = z.object({
	productId: z.string(),
	buyerId: z.string({
		message: '구매자를 선택해주세요'
	}),
	buyerName: z.string(),
	productTitle: z.string()
})

export type CompleteTradeDto = z.infer<typeof completeTradeDto>
