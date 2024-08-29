'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { createDeliveryInfoDto } from '#/me/order/model'

export const createDeliveryInfoAction = authAction
	.metadata({
		actionName: 'createDeliveryInfo'
	})
	.schema(createDeliveryInfoDto)
	.action(async ({ parsedInput, ctx }) => {
		const { userId } = ctx

		if (parsedInput.isPrimary) {
			await db.deliveryInformation.updateMany({
				where: {
					userId
				},
				data: {
					isPrimary: false
				}
			})
		}

		await db.deliveryInformation.create({
			data: {
				...parsedInput,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		revalidatePath('/me/info')
		revalidatePath('/shop/checkout')
	})
