'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const requestProductReviewAction = authAction
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.metadata({ actionName: 'requestProductReviewAction' })
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		await requestProductReview(userId, productId)
		revalidatePath(`/maker/product/${productId}`)
	})

async function requestProductReview(userId: string, productId: string) {
	await db.product.update({
		where: {
			id: productId,
			maker: {
				userId
			}
		},
		data: {
			status: 'REVIEWING'
		}
	})
}

export { requestProductReviewAction }
