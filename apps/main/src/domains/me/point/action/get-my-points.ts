'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const getMyPointsAction = authAction
	.metadata({
		actionName: 'getMyPoints'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx

		const { totalPoint } = await db.user.findUniqueOrThrow({
			where: {
				id: userId
			},
			select: {
				totalPoint: true
			}
		})

		const points = await db.pointRecord.findMany({
			where: {
				userId
			},
			include: {
				productOrder: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return {
			totalPoint,
			points
		}
	})
