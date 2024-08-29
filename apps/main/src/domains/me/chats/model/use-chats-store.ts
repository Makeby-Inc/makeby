import { create } from 'zustand'
import { type ChatRoomDetail } from '#/me/chats/model/chat-detail'
import { type ChatListItem } from '#/me/chats/model/chat-list-item'

interface ChatsProps {
	list: ChatListItem[]
	detail?: ChatRoomDetail
}

interface ChatsState extends ChatsProps {
	setList: (list: ChatListItem[]) => void
	setDetail: (detail: ChatRoomDetail | undefined) => void
}

const initChatProps: ChatsProps = {
	list: [],
	detail: undefined
}

export const useChatsStore = create<ChatsState>((set) => {
	return {
		...initChatProps,
		setList: (list) => {
			set({ list })
		},
		setDetail: (detail) => {
			set({ detail })
		}
	}
})
