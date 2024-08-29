import { db } from '@core/models'
import { authAction } from '@core/react'

export const getPrimaryDeliveryInfoAction = authAction
	.metadata({
		actionName: 'getPrimaryDeliveryInfo'
	})
	.action(async ({ ctx }) => {
		const userId = ctx.userId

		const deliveryInfo = await db.deliveryInformation.findFirst({
			where: {
				userId
			},
			orderBy: {
				isPrimary: 'desc'
			}
		})

		return deliveryInfo
	})
