'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const getMyTotalPoint = authAction
	.metadata({
		actionName: 'getMyTotalPoint'
	})
	.action(async ({ ctx }) => {
		const userId = ctx.userId

		const { totalPoint } = await db.user.findUniqueOrThrow({
			where: {
				id: userId
			}
		})

		return { totalPoint }
	})
