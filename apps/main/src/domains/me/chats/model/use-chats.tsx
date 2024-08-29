'use client'

import { useAction } from '@core/react'
import { delay } from '@core/utils'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useChatsStore } from '#/me/chats/model/use-chats-store'
import { getChatDetailAction } from '#/me/chats/action/get-chat-detail'
import { getChatRoomsAction } from '#/me/chats/action/get-chat-rooms'

export function useChats() {
	const { setDetail, setList } = useChatsStore()
	const [loading, setLoading] = useState(true)
	const params = useParams()
	const chatRoomId = params.id as string

	const getList = useAction(getChatRoomsAction, {
		onSuccess: async ({ data }) => {
			if (data) {
				setList(data)
				await delay(500)
				setLoading(false)
			}
		}
	})
	const getDetail = useAction(getChatDetailAction, {
		onSuccess: async ({ data }) => {
			if (data) {
				setDetail(data)
				await delay(500)

				setLoading(false)
			}
		}
	})

	useEffect(() => {
		setDetail(undefined)

		getDetail.execute({
			chatRoomId
		})
		getList.execute()

		const interval = setInterval(() => {
			setLoading(true)
			getDetail.execute({
				chatRoomId
			})
			getList.execute()
		}, 3000)

		return () => {
			clearInterval(interval)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chatRoomId])

	return {
		loading
	}
}
