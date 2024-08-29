'use server'

import { type Prisma, db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import {
	type ChatRoomDetail,
	chatRoomMessageInclude
} from '#/me/chats/model/chat-detail'
import { getRoomDefaultFilter } from '../model/room-default-filter'

const getChatDetailAction = authAction
	.metadata({
		actionName: 'getChatDetailAction'
	})
	.schema(
		z.object({
			chatRoomId: z.string().optional()
		})
	)
	.action(async ({ parsedInput: { chatRoomId }, ctx: { userId } }) => {
		const chatDetail = await getChatDetail(userId, chatRoomId)
		revalidatePath('/', 'layout')
		return chatDetail
	})

export const getChatDetail = async (
	userId: string,
	chatRoomId?: string
): Promise<ChatRoomDetail | null> => {
	const defaultFilter = getRoomDefaultFilter(userId)

	// 채팅방 ID가 있는 경우 해당 채팅방을 조회
	if (chatRoomId) {
		const chat = await db.fleaMarketChatRoom.findUnique({
			where: {
				id: chatRoomId,
				AND: [{ id: chatRoomId }, defaultFilter]
			},
			include: chatRoomMessageInclude
		})

		// 채팅방 읽음 처리
		if (chat) {
			const isSender = chat.senderUserId === userId
			const updateData: Prisma.MessageUncheckedUpdateManyInput = {
				isSenderRead: isSender ? true : undefined,
				isReceiverRead: isSender ? undefined : true
			}
			await db.message.updateMany({
				where: {
					chatRoomId
				},
				data: updateData
			})
		}

		return chat
	}

	// 채팅방 ID가 없는 경우 최근 채팅방을 조회
	const chat = await db.fleaMarketChatRoom.findFirst({
		where: defaultFilter,
		orderBy: {
			updatedAt: 'desc'
		},
		include: chatRoomMessageInclude
	})
	return chat
}
export { getChatDetailAction }
