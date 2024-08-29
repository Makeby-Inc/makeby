'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { createReviewDto } from '#/me/order/model/create-review-dto'

export const createReviewAction = authAction
	.metadata({
		actionName: 'createReview'
	})
	.schema(createReviewDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { orderItemId, content, productImages } = parsedInput

		const {
			option: { prouductId }
		} = await db.productOrderItem.findUniqueOrThrow({
			where: {
				id: orderItemId
			},
			include: {
				option: {}
			}
		})

		await db.productReview.create({
			data: {
				content,
				reviewImages: productImages,
				user: {
					connect: {
						id: userId
					}
				},
				product: {
					connect: {
						id: prouductId
					}
				},
				orderItem: {
					connect: {
						id: orderItemId
					}
				}
			}
		})

		revalidatePath('/me/orders')
	})
