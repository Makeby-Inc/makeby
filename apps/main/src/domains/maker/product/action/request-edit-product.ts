'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const requestEditProductAction = authAction
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.metadata({ actionName: 'requestEditProductAction' })
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		await requestEditProduct(userId, productId)
		revalidatePath(`/maker/product/${productId}`)
	})

async function requestEditProduct(userId: string, productId: string) {
	const maker = await db.maker.findUniqueOrThrow({
		where: {
			userId
		}
	})
	await Promise.all([
		db.productEditRequest.create({
			data: {
				productId,
				makerId: maker.id
			}
		}),
		db.product.update({
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
	])
}

export { requestEditProductAction }
