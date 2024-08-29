'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { getWeeklyOrderSummaryDto } from '#/maker/dashboard/model/get-weekly-order-summary-dto'
import { getDatesByWeekNumber } from '~/shared'

export const getWeeklyOrderSummaryAction = authAction
	.metadata({
		actionName: 'get-weekly-order-summary'
	})
	.schema(getWeeklyOrderSummaryDto)
	.action(async ({ parsedInput, ctx }) => {
		const { userId } = ctx
		const { year, weekNumber } = parsedInput
		const maker = await db.maker.findUniqueOrThrow({
			where: { userId }
		})

		const { startDate, endDate, dates } = getDatesByWeekNumber({
			year,
			weekNumber
		})

		const dailyOrders = await db.productOrderItem.findMany({
			where: {
				option: {
					product: {
						makerId: maker.id
					}
				},
				createdAt: {
					gte: startDate,
					lt: endDate
				},
				deliveryStatus: {
					notIn: ['RETURNED', 'EXCHANGED', 'CANCELED']
				}
			}
		})

		const dailyItems = dates.map((date) => {
			const dateISO = date.toISOString().slice(0, 10)

			const totalRevenueAmount = dailyOrders
				.filter((order) => order.createdAt.toISOString().slice(0, 10) === dateISO)
				.reduce((acc, order) => acc + order.totalPrice, 0)

			const totalRevenueCount = dailyOrders
				.filter((order) => order.createdAt.toISOString().slice(0, 10) === dateISO)
				.reduce((acc, order) => acc + order.quantity, 0)

			return {
				date,
				totalRevenueAmount,
				totalRevenueCount
			}
		}) as { date: Date; totalRevenueAmount: number; totalRevenueCount: number }[]

		const totalRevenueAmount = dailyItems.reduce(
			(acc, item) => acc + item.totalRevenueAmount,
			0
		)
		const totalRevenueCount = dailyItems.reduce(
			(acc, item) => acc + item.totalRevenueCount,
			0
		)

		return {
			dailyItems,
			totalRevenueAmount,
			totalRevenueCount
		}
	})
