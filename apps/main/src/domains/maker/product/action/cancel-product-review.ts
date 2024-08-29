'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const cancelProductReviewAction = authAction
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.metadata({ actionName: 'cancelProductReviewAction' })
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		await cancelProductReview(userId, productId)
		revalidatePath(`/maker/product/${productId}`)
	})

async function cancelProductReview(userId: string, productId: string) {
	await db.product.update({
		where: {
			id: productId,
			maker: {
				userId
			}
		},
		data: {
			status: 'PENDING'
		}
	})
}

export { cancelProductReviewAction }
