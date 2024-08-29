import { z } from 'zod'

export const createOrderDto = z.object({
	orderId: z.string(),
	orderTitle: z.string(),
	deliveryInfoId: z.string(),
	deliveryMessage: z.string().optional(),
	usedPoints: z.number().default(0),
	paymentMethod: z.string(),
	receiptUrl: z.string()
})
