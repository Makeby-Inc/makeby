'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

const getMakerRegisteredStatusAction = authAction
	.metadata({
		actionName: 'getMakerRegisteredStatusAction'
	})
	.action(async ({ ctx: { userId } }) => {
		const maker = await getMakerRegisteredStatus(userId)
		return maker
	})

const getMakerRegisteredStatus = async (userId: string) => {
	const registeredMaker = await db.maker.findUnique({
		where: { userId },
		select: {
			status: true
		}
	})
	return registeredMaker
}
export { getMakerRegisteredStatusAction }
