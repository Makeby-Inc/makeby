'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { updateDeliveryInfoDto } from '#/me/order/model/update-delivery-info-dto'

export const updateDeliveryInfoAction = authAction
	.metadata({
		actionName: 'updateDeliveryInfoAction'
	})
	.schema(updateDeliveryInfoDto)
	.action(async ({ ctx, parsedInput }) => {
		const { id, ...data } = parsedInput
		const userId = ctx.userId

		if (data.isPrimary) {
			await db.deliveryInformation.updateMany({
				where: {
					userId
				},
				data: {
					isPrimary: false
				}
			})
		}

		await db.deliveryInformation.update({
			where: {
				id,
				userId
			},
			data
		})

		revalidatePath('/me/info')
		revalidatePath('/shop/checkout')

		return true
	})
