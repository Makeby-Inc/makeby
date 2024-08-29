'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { type PhoneUpdateDto, phoneUpdateDto } from '#/me/_model'

export const phoneUpdateAction = authAction
	.metadata({
		actionName: 'phoneUpdate'
	})
	.schema(phoneUpdateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const updatedPhone = await updatePhone(userId, dto)
		return updatedPhone
	})

async function updatePhone(userId: string, dto: PhoneUpdateDto) {
	const { phoneNumber } = dto
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { phoneNumber: true }
	})

	if (!user) {
		throw new Error('User not found')
	}

	const updatedUser = await db.user.update({
		where: { id: userId },
		data: {
			phoneNumber
		}
	})

	return updatedUser.phoneNumber
}
