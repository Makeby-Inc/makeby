'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { cancelOrderItemDto } from '#/me/order/model/cancel-order-item-dto'

export const cancelOrderItemAction = authAction
	.metadata({
		actionName: 'cancelOrderItem'
	})
	.schema(cancelOrderItemDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { orderItemId, cancelReasonType, reason } = parsedInput

		await db.productOrderItem.update({
			where: {
				order: {
					userId
				},
				id: orderItemId
			},
			data: {
				deliveryStatus: 'CANCELED',
				orderCancelRequest: {
					create: {
						cancelReasonType,
						reason
					}
				}
			}
		})

		revalidatePath('/me/orders')
	})
