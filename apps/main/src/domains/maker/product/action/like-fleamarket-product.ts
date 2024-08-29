'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const likeFleamarketProductAction = authAction
	.metadata({
		actionName: 'likeFleamarketProductAction'
	})
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		const updatedLike = await toggleLikeProduct(productId, userId)

		revalidatePath(`/fleamarket/products/${productId}`)

		return {
			liked: updatedLike
		}
	})

async function toggleLikeProduct(fleaMarketProductId: string, userId: string) {
	const like = await db.fleaMarketProductLike.findFirst({
		where: {
			fleaMarketProductId,
			userId
		}
	})
	const liked = !!like

	if (liked) {
		await db.fleaMarketProductLike.delete({
			where: {
				id: like.id
			}
		})
	} else {
		await db.fleaMarketProductLike.create({
			data: {
				fleaMarketProductId,
				userId
			}
		})
	}

	return !liked
}

export { likeFleamarketProductAction }
