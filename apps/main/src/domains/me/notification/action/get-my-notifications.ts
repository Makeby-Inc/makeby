'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const getMyNotifications = authAction
	.metadata({
		actionName: 'getMyNotifications'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const tenDaysAgo = new Date()
		tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)

		return await db.notification.findMany({
			where: {
				userId,
				createdAt: {
					gte: tenDaysAgo
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	})
