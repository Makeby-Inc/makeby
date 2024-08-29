import { cn } from '@core/utils'
import { ChatImageViewer } from '#/me/chats/ui/chat-image-viewer'
import { ProfileAvatar } from '~/shared'

interface ReceiverChatBubbleProps {
	userImage: string
	text?: string | null
	images?: string[]
	messageTime: Date
	isFirstMessageOfConsecutive?: boolean
	isLastMessageOfTime?: boolean
}

export function ReceiverChatBubble({
	userImage,
	text,
	images,
	messageTime,
	isFirstMessageOfConsecutive,
	isLastMessageOfTime
}: ReceiverChatBubbleProps) {
	const formattedTime = new Date(messageTime).toLocaleTimeString('ko-KR', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	})

	return (
		<div className="flex gap-2">
			<ProfileAvatar
				imageUrl={userImage}
				name="사용자 이미지"
				size="sm"
				className={cn(
					'invisible h-11 w-11',
					isFirstMessageOfConsecutive && 'visible'
				)}
			/>
			<div className="flex items-end gap-2">
				<div className="grid items-start gap-2">
					{text ? (
						<div className="bg-secondary w-fit rounded-lg px-5 py-3 text-sm">
							{text}
						</div>
					) : null}
					{images ? <ChatImageViewer images={images} /> : null}
				</div>
				{isLastMessageOfTime ? (
					<div className="text-muted-foreground text-xs">{formattedTime}</div>
				) : null}
			</div>
		</div>
	)
}
