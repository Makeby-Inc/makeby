'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'

const isMyProductAction = authAction
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.metadata({ actionName: 'isMyProductAction' })
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		const product = await isMyProduct(userId, productId)
		return {
			product
		}
	})

async function isMyProduct(userId: string, productId: string) {
	const product = await db.fleaMarketProduct.findUnique({
		where: {
			id: productId,
			sellerUserId: userId
		}
	})
	return !!product
}

export { isMyProductAction }
