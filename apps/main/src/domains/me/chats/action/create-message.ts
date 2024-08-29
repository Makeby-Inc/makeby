'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import {
	type MessageCreateDto,
	messageCreateDto
} from '#/me/chats/model/message-create-dto'

const createMessageAction = authAction
	.metadata({
		actionName: 'createMessageAction'
	})
	.schema(messageCreateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await createMessage(userId, dto)
		revalidatePath(`/me/chats`, 'layout')
		return true
	})

export const createMessage = async (userId: string, dto: MessageCreateDto) => {
	const { text, images, ...data } = dto
	const chat = await db.message.create({
		data: {
			senderUserId: userId,
			text,
			images: images || [],
			...data
		}
	})

	await db.fleaMarketChatRoom.update({
		where: {
			id: chat.chatRoomId
		},
		data: {
			updatedAt: new Date()
		}
	})
}

export { createMessageAction }
