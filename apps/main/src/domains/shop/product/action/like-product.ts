'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const likeProductAction = authAction
	.metadata({
		actionName: 'likeProduct'
	})
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.action(async ({ parsedInput, ctx }) => {
		const { productId } = parsedInput
		const { userId } = ctx

		const updatedLike = await toggleLikeProduct(productId, userId)

		revalidatePath(`/shop/products/${productId}`)

		return {
			liked: updatedLike
		}
	})

async function toggleLikeProduct(productId: string, userId: string) {
	const like = await db.productLike.findFirst({
		where: {
			productId,
			userId
		}
	})
	const liked = !!like

	if (liked) {
		await db.productLike.delete({
			where: {
				id: like.id
			}
		})
	} else {
		await db.productLike.create({
			data: {
				productId,
				userId
			}
		})
	}

	return !liked
}
