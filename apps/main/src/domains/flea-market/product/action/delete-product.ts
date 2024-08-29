'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const deleteProductAction = authAction
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.metadata({ actionName: 'deleteProductAction' })
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		await deleteProduct(userId, productId)
		revalidatePath('/fleamarket/products')
		return true
	})

async function deleteProduct(userId: string, productId: string) {
	await db.fleaMarketProduct.delete({
		where: {
			id: productId,
			sellerUserId: userId
		}
	})
}

export { deleteProductAction }
