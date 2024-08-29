'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const deleteReviewAction = authAction
	.metadata({ actionName: 'deleteReviewAction' })
	.schema(
		z.object({
			reviewId: z.string()
		})
	)
	.action(async ({ parsedInput: { reviewId }, ctx: { userId } }) => {
		await deleteReview(userId, reviewId)
		revalidatePath('/me/fleamarket/products')
	})

export async function deleteReview(userId: string, reviewId: string) {
	await db.fleaMarketProductReview.delete({
		where: {
			id: reviewId,
			userId
		}
	})
}

export { deleteReviewAction }
