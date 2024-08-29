import { z } from 'zod'

export const updateCartItemQuantityDto = z.object({
	optionId: z.string(),
	quantity: z.number().int()
})

export type UpdateCartItemQuantityDto = z.infer<
	typeof updateCartItemQuantityDto
>
