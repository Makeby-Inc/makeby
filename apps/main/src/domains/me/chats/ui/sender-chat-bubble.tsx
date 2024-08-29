import { ChatImageViewer } from '#/me/chats/ui/chat-image-viewer'

interface SenderChatBubbleProps {
	text?: string | null
	images?: string[]
	messageTime: Date
	isLastMessageOfTime?: boolean
}

export function SenderChatBubble({
	text,
	images,
	messageTime,
	isLastMessageOfTime
}: SenderChatBubbleProps) {
	const isImages = images && images.length > 0
	const formattedTime = new Date(messageTime).toLocaleTimeString('ko-KR', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	})

	return (
		<div className="flex items-end justify-end gap-2">
			{isLastMessageOfTime ? (
				<div className="text-muted-foreground text-xs">{formattedTime}</div>
			) : null}
			<div className="grid items-end justify-end gap-2">
				{text ? (
					<div className="bg-primary text-background w-fit justify-self-end rounded-lg px-5 py-3 text-sm">
						{text}
					</div>
				) : null}
				{isImages ? <ChatImageViewer images={images} /> : null}
			</div>
		</div>
	)
}
