'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { calculationService } from '#/maker/_service/calculation-service'

export const requestWithdrawal = authAction
	.metadata({
		actionName: 'requestWithdrawal'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const maker = await db.maker.findUniqueOrThrow({
			where: {
				userId
			}
		})

		await calculationService.addRecordByWithdrawalRequest(maker.id)

		revalidatePath('/maker/dashboard/calculate')
	})
