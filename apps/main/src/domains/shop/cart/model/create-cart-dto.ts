import { z } from 'zod'

export const createCartDto = z.object({
	items: z.array(
		z.object({
			optionId: z.string(),
			quantity: z.number()
		})
	)
})

export type CreateCartDto = z.infer<typeof createCartDto>
