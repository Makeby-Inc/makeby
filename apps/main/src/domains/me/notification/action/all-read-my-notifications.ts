'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'

export const allReadMyNotificationsAction = authAction
	.metadata({
		actionName: 'allReadMyNotifications'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx

		await db.notification.updateMany({
			where: {
				userId
			},
			data: {
				isRead: true
			}
		})

		revalidatePath('/me/notification', 'page')
		revalidatePath('/', 'layout')
	})
