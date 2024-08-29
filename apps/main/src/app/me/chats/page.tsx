import { authService } from '@providers/auth'
import { getChatDetail } from '#/me/chats'
import { ChatInput, ChatSection, ChatroomInformation } from '#/me/chats/ui'

export const metadata = {
	title: '채팅'
}

export default async function ChatListPage() {
	const userId = await authService.getMyUserIdOrThrow()
	const recentChat = await getChatDetail(userId)
	const isSender = recentChat?.senderUserId === userId
	const chatTerminated =
		recentChat?.deletedByReceiver || recentChat?.deletedBySender

	return (
		<div className="max-pc:hidden flex h-full flex-1 flex-col">
			{recentChat ? (
				<>
					<ChatroomInformation data={recentChat} isSender={isSender} />
					<ChatSection userId={userId} />
				</>
			) : (
				<div className="text-muted-foreground max-pc:whitespace-pre-line flex flex-1 items-center justify-center text-center font-medium">
					<span className="max-pc:hidden">{`상대방이 외부 메신저로 유도하는 경우,\n피해가 있을 수 있으니 주의하세요!`}</span>
					<div className="pc:hidden grid gap-1 text-center">
						<span className="text-secondary-foreground text-xl font-semibold">
							아직 진행중인 채팅이 없어요
						</span>
						<span className="text-muted-foreground font-medium">
							새로운 대화를 시작해보세요
						</span>
					</div>
				</div>
			)}
			<ChatInput
				chatRoomId={recentChat?.id || ''}
				receiverUserId={
					(isSender ? recentChat.receiverUserId : recentChat?.senderUserId) || ''
				}
				disabled={!recentChat || chatTerminated}
			/>
		</div>
	)
}
