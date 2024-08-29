'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { deleteRoomDto } from '../model/delete-room-dto'
import { getRoomDefaultFilter } from '../model/room-default-filter'

export const deleteRoomAction = authAction
	.metadata({
		actionName: 'deleteRoom'
	})
	.schema(deleteRoomDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { roomId } = parsedInput
		const filter = getRoomDefaultFilter(userId)

		const getRoom = await db.fleaMarketChatRoom.findUnique({
			where: {
				id: roomId
			}
		})

		const isSender = getRoom?.senderUserId === userId

		await db.fleaMarketChatRoom.update({
			data: {
				deletedBySender: isSender,
				deletedByReceiver: !isSender
			},
			where: {
				id: roomId
			}
		})

		revalidatePath('/me/chats', 'layout')
		redirect('/me/chats')
	})
