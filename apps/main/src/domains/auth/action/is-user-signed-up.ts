'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const isUserSignedUp = authAction
	.metadata({ actionName: 'isUserSignedUp' })
	.action(async ({ ctx: { userId } }) => {
		const signedUpUser = await db.user.findUnique({
			where: { id: userId, phoneNumber: { not: null } }
		})
		return !!signedUpUser
	})
