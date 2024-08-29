'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'

export const switchEmailSubscriptionAction = authAction
	.metadata({
		actionName: 'switchEmailSubscription'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const updatedSubscription = await switchEmailSubscription(userId)
		return updatedSubscription
	})

async function switchEmailSubscription(userId: string) {
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { isEmailSubscribed: true }
	})

	if (!user) {
		throw new Error('User not found')
	}

	const isSubscribed = user.isEmailSubscribed

	const updatedUser = await db.user.update({
		where: { id: userId },
		data: {
			isEmailSubscribed: !isSubscribed
		}
	})

	return updatedUser.isEmailSubscribed
}
