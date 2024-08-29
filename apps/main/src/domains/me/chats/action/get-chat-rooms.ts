'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { chatRoomsInclude } from '#/me/chats/model/chat-list-item'
import { getRoomDefaultFilter } from '../model/room-default-filter'

const getChatRoomsAction = authAction
	.metadata({
		actionName: 'getChatRoomsAction'
	})
	.action(async ({ ctx: { userId } }) => {
		const chatRooms = await getChatRooms(userId)
		return chatRooms
	})

export const getChatRooms = async (userId: string) => {
	const filter = getRoomDefaultFilter(userId)

	const chatRooms = await db.fleaMarketChatRoom.findMany({
		where: filter,
		orderBy: {
			updatedAt: 'desc'
		},
		include: chatRoomsInclude
	})
	return chatRooms
}
export { getChatRoomsAction }
