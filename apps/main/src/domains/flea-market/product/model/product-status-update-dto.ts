import { FleaMarketProductStatus } from '@core/models'
import { z } from 'zod'

export const productStatusUpdateDto = z.object({
	productId: z.string(),
	status: z.nativeEnum(FleaMarketProductStatus)
})

export type ProductStatusUpdateDto = z.infer<typeof productStatusUpdateDto>
