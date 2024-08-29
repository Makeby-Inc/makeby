'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { getMonthlyOrderSummaryDto } from '#/maker/dashboard/model/get-monthly-order-summary-dto'

export const getMonthlyOrderSummaryAction = authAction
	.metadata({
		actionName: 'getMonthlyOrderSummaryAction'
	})
	.schema(getMonthlyOrderSummaryDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { month, year } = parsedInput

		const maker = await db.maker.findUniqueOrThrow({
			where: {
				userId
			}
		})

		const orderItems = await db.productOrderItem.groupBy({
			by: ['deliveryStatus'],
			where: {
				option: {
					product: {
						makerId: maker.id
					}
				},
				createdAt: {
					gte: new Date(year, month - 1, 1),
					lt: new Date(year, month, 1)
				}
			},
			_sum: {
				totalPrice: true
			}
		})

		const totalOrderAmount = orderItems.reduce(
			(acc, item) => acc + (item._sum.totalPrice || 0),
			0
		)
		const totalCancelAmount =
			orderItems.find((i) => i.deliveryStatus === 'CANCELED')?._sum.totalPrice || 0
		const totalExchangeAmount =
			orderItems.find((i) => i.deliveryStatus === 'EXCHANGED')?._sum.totalPrice ||
			0
		const totalRevenue =
			totalOrderAmount - totalCancelAmount - totalExchangeAmount

		return {
			totalOrderAmount,
			totalCancelAmount,
			totalExchangeAmount,
			totalRevenue
		}
	})
