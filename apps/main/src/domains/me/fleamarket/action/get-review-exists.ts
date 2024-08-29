'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'
import { fleamarketProductReviewInclude } from '#/me/fleamarket/model/review-detail'

const getReviewExistAction = authAction
	.metadata({ actionName: 'getReviewExistAction' })
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		const review = await getReviewExist(userId, productId)
		return review
	})

export async function getReviewExist(userId: string, productId: string) {
	const review = await db.fleaMarketProductReview.findUnique({
		where: {
			fleaMarketProductId: productId
		},
		include: fleamarketProductReviewInclude
	})
	return review
}

export { getReviewExistAction }
