'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { myOrderInclude } from '#/me/order/model/my-order-include'

export const getMyOrdersAction = authAction
	.metadata({
		actionName: 'getMyOrderAction'
	})
	// .schema(
	// 	z.object({
	// 		status: z.string().optional()
	// 	})
	// )
	.action(async ({ ctx }) => {
		const { userId } = ctx

		const myOrders = await db.productOrder.findMany({
			include: myOrderInclude,
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return myOrders
	})
