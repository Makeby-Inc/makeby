'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import {
	type ChatroomCreateDto,
	chatroomCreateDto
} from '#/flea-market/chat/model'

const createChatroomAction = authAction
	.schema(chatroomCreateDto)
	.metadata({ actionName: 'createChatroomAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const chatroomId = await createChatroom(userId, dto)
		return { chatroomId }
	})

async function createChatroom(userId: string, dto: ChatroomCreateDto) {
	const existChatroom = await db.fleaMarketChatRoom.findUnique({
		where: {
			senderUserId_receiverUserId_fleaMarketProductId: {
				senderUserId: userId,
				...dto
			}
		}
	})

	if (existChatroom) {
		return existChatroom.id
	}

	const chatroom = await db.fleaMarketChatRoom.create({
		data: {
			senderUserId: userId,
			...dto
		}
	})
	return chatroom.id
}

export { createChatroomAction }
