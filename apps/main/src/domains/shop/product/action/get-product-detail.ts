'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'
import { authService } from '@providers/auth'
import { productDetailInclude } from '#/shop/product/model/product-detail'

export const getProductDetailAction = action
	.metadata({ actionName: 'getProductDetail' })
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ parsedInput }) => {
		return await getProductDetail(parsedInput.id)
	})

export async function getProductDetail(id: string) {
	const session = await authService.getMySession()
	const userId = session?.user.id
	let productLiked = false

	const productDetail = await db.product.findUnique({
		where: { id },
		include: productDetailInclude
	})

	if (userId) {
		const like = await db.productLike.findFirst({
			where: {
				productId: id,
				userId
			}
		})
		productLiked = !!like
	}

	return { productDetail, productLiked }
}
