'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'

const verifyPhoneNumber = async (phoneNumber: string, code: string) => {
	const now = new Date()
	const recentMatchedToken = await db.verificationToken.findFirst({
		where: {
			identifier: phoneNumber,
			expires: {
				gt: now
			}
		},
		orderBy: {
			expires: 'desc'
		}
	})
	return recentMatchedToken?.token === code
}

const verifyPhoneNumberAction = action
	.metadata({ actionName: 'verifyPhoneNumberAction' })
	.schema(
		z.object({
			phoneNumber: z.string(),
			code: z.string()
		})
	)
	.action(async ({ parsedInput: { phoneNumber, code } }) => {
		const isVerified = await verifyPhoneNumber(phoneNumber, code)
		return isVerified
	})

export { verifyPhoneNumberAction }
