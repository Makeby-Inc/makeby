'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { editBankAccountDto } from '../model/edit-bank-account-dto'

export const editMyBankAccountAction = authAction
	.metadata({
		actionName: 'editMyBankAccountAction'
	})
	.schema(editBankAccountDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx

		await db.maker.update({
			data: {
				bankAccount: {
					upsert: {
						create: parsedInput,
						update: parsedInput
					}
				}
			},
			where: {
				userId
			}
		})

		revalidatePath('/maker/dashboard/calculation')
	})
