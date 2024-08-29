import { z } from 'zod'
import { productRegisterDto } from '#/maker/product/model/product-register-dto'

export const productEditDto = productRegisterDto.extend({
	productId: z.string()
})

export type ProductEditDto = z.infer<typeof productEditDto>
