import { authService } from '@providers/auth'
import { notFound } from 'next/navigation'
import { getChatDetail } from '#/me/chats'
import { ChatInput, ChatSection, ChatroomInformation } from '#/me/chats/ui'

export const metadata = {
	title: '채팅 상세'
}

export default async function ChatRoomPage({
	params
}: {
	params: {
		id: string
	}
}) {
	const userId = await authService.getMyUserIdOrThrow()
	const chat = await getChatDetail(userId, params.id)
	if (!chat) notFound()

	const chatTerminated = chat.deletedByReceiver || chat.deletedBySender
	const isSender = chat.senderUserId === userId

	return (
		<div className="flex h-full flex-1 flex-col">
			<ChatroomInformation data={chat} isSender={isSender} />
			<ChatSection userId={userId} />
			<ChatInput
				chatRoomId={params.id}
				receiverUserId={isSender ? chat.receiverUserId : chat.senderUserId}
				disabled={chatTerminated}
			/>
		</div>
	)
}
