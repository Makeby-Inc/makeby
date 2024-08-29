'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { solapiService } from '@providers/solapi'
import { z } from 'zod'

const sendVerificationCodeAction = action
	.metadata({ actionName: 'sendVerificationCodeAction' })
	.schema(
		z.object({
			phoneNumber: z.string()
		})
	)
	.action(async ({ parsedInput: dto }) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO
		const { token } = await createVerificationToken(dto.phoneNumber)
		await solapiService.sendVerificationSms(dto.phoneNumber, token)
		return true
	})

const createVerificationToken = async (phoneNumber: string) => {
	const token = Math.floor(100000 + Math.random() * 900000).toString()
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24)

	const createdToken = await db.verificationToken.create({
		data: {
			identifier: phoneNumber,
			token,
			expires
		}
	})

	return createdToken
}

export { sendVerificationCodeAction }
