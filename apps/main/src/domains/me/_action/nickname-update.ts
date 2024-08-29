'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { type NicknameUpdateDto, nicknameUpdateDto } from '#/me/_model'

export const nicknameUpdateAction = authAction
	.metadata({
		actionName: 'nicknameUpdate'
	})
	.schema(nicknameUpdateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const updatedNickname = await updateNickname(userId, dto)
		return updatedNickname
	})

async function updateNickname(userId: string, dto: NicknameUpdateDto) {
	const { name } = dto
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { name: true }
	})

	if (!user) {
		throw new Error('User not found')
	}

	const updatedUser = await db.user.update({
		where: { id: userId },
		data: {
			name
		}
	})

	return updatedUser.name
}
