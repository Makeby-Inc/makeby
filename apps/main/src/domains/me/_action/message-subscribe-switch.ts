'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'

export const switchMessageSubscriptionAction = authAction
	.metadata({
		actionName: 'switchMessageSubscription'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const updatedSubscription = await switchMessageSubscription(userId)
		return updatedSubscription
	})

async function switchMessageSubscription(userId: string) {
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { isMessageSubscribed: true }
	})

	if (!user) {
		throw new Error('User not found')
	}

	const isSubscribed = user.isMessageSubscribed

	const updatedUser = await db.user.update({
		where: { id: userId },
		data: {
			isMessageSubscribed: !isSubscribed
		}
	})

	return updatedUser.isMessageSubscribed
}
