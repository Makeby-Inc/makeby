'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'

export const getMyBankAccountAction = authAction
	.metadata({
		actionName: 'getMyBankAccountAction'
	})
	.action(async ({ ctx }) => {
		const { userId } = ctx
		const { bankAccount } = await db.maker.findFirstOrThrow({
			where: { userId },
			select: { bankAccount: true }
		})

		return {
			bankAccount
		}
	})
