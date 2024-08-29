'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { type ImageUpdateDto, imageUpdateDto } from '#/me/_model'

export const imageUpdateAction = authAction
	.metadata({
		actionName: 'imageUpdate'
	})
	.schema(imageUpdateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const updatedImageUrl = await updateImageUrl(userId, dto)
		return updatedImageUrl
	})

async function updateImageUrl(userId: string, dto: ImageUpdateDto) {
	const { image } = dto
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { image: true }
	})

	if (!user) {
		throw new Error('User not found')
	}

	const updatedUser = await db.user.update({
		where: { id: userId },
		data: {
			image
		}
	})

	return updatedUser.image
}
