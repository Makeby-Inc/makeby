'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProductViewCountAction = action
	.metadata({ actionName: 'updateProductViewCountAction' })
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ parsedInput: { id } }) => {
		await updateProductViewCount(id)
		revalidatePath(`/fleamarket/products/${id}`)
	})

async function updateProductViewCount(id: string) {
	const categories = await db.fleaMarketProduct.update({
		where: {
			id
		},
		data: {
			viewCount: {
				increment: 1
			}
		}
	})
	return categories
}

export { updateProductViewCountAction }
