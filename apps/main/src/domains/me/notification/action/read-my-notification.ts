'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const readMyNotificationAction = authAction
	.metadata({ actionName: 'readMyNotification' })
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { id } = parsedInput

		await db.notification.update({
			where: {
				id,
				userId
			},
			data: {
				isRead: true
			}
		})

		revalidatePath('/', 'layout')
		revalidatePath('/me/notification', 'page')
	})
