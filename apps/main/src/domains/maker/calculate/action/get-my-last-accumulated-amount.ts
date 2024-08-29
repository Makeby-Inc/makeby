'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { calculationService } from '../../_service/calculation-service'

export const getMyLastAccumulatedAmountAction = authAction
	.metadata({
		actionName: 'getMyLastAccumulatedAmountAction'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const maker = await db.maker.findUniqueOrThrow({
			where: {
				userId
			}
		})

		const amount = await calculationService.getAccumulatedAmountByMakerId(
			maker.id
		)

		return { amount }
	})
