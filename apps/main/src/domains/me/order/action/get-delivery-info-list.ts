'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const getDeliveryInfoList = authAction
	.metadata({
		actionName: 'getDeliveryInfoList'
	})
	.action(async ({ ctx }) => {
		const userId = ctx.userId

		const deliveryInfoList = await db.deliveryInformation.findMany({
			where: {
				userId
			},
			orderBy: {
				isPrimary: 'desc'
			}
		})

		return { deliveryInfoList }
	})
