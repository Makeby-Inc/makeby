'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'
import { authService } from '@providers/auth'
import { fleamarketProductDetailInclude } from '#/flea-market/product/model'

const getFleamarketProductDetailAction = action
	.metadata({ actionName: 'getFleamarketProductDetailAction' })
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ parsedInput: { id } }) => {
		return await getFleamarketProductDetail(id)
	})

export async function getFleamarketProductDetail(id: string) {
	const session = await authService.getMySession()
	const userId = session?.user.id
	let productLiked = false

	const productDetail = await db.fleaMarketProduct.findUnique({
		where: { id },
		include: fleamarketProductDetailInclude
	})

	if (userId) {
		const like = await db.fleaMarketProductLike.findFirst({
			where: {
				fleaMarketProductId: id,
				userId
			}
		})
		productLiked = !!like
	}

	return { productDetail, productLiked }
}

export { getFleamarketProductDetailAction }
