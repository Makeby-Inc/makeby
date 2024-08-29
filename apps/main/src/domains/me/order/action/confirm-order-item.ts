'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { RATIO_OF_POINTS_EARNED } from '~/shared'
import { calculationService } from '#/maker/_service/calculation-service'

export const confirmOrderItemAction = authAction
	.metadata({
		actionName: 'confirmOrderItem'
	})
	.schema(
		z.object({
			orderItemId: z.string()
		})
	)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { orderItemId } = parsedInput

		await confirmOrderItemById(orderItemId, userId)

		revalidatePath('/me/orders')
	})

export async function confirmOrderItemById(
	orderItemId: string,
	userId: string
) {
	const orderItem = await db.productOrderItem.update({
		where: {
			order: {
				userId
			},
			id: orderItemId
		},
		data: {
			deliveryStatus: 'CONFIRMED'
		}
	})

	const addedPoint = Math.floor(orderItem.totalPrice * RATIO_OF_POINTS_EARNED)

	await db.user.update({
		where: {
			id: userId
		},
		data: {
			totalPoint: {
				increment: addedPoint
			},
			pointRecords: {
				create: {
					pointAmount: addedPoint,
					orderId: orderItem.orderId,
					isUsed: false
				}
			}
		}
	})

	await calculationService.addRecordByOrderItemConfirmed(orderItemId)
}
