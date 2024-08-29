'use client'

import { useEffect, useRef, useState } from 'react'
import { groupConsecutiveMessages, type Message } from '#/me/chats/model'
import { useChatsStore } from '#/me/chats/model/use-chats-store'
import { ReceiverChatBubble } from '#/me/chats/ui/receiver-chat-bubble'
import { SenderChatBubble } from '#/me/chats/ui/sender-chat-bubble'

export function ChatSection({ userId }: { userId: string }) {
	const messagesEndRef = useRef<HTMLDivElement | null>(null)
	const { detail } = useChatsStore()
	const isEmptyMessage = detail?.messages.length === 0
	const [prevMessageCount, setPrevMessageCount] = useState(0)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({
			behavior: 'smooth'
		})
	}

	useEffect(() => {
		const currentMessageCount = detail?.messages.length || 0
		if (currentMessageCount > prevMessageCount) {
			scrollToBottom()
		}
		setPrevMessageCount(currentMessageCount)
	}, [detail?.messages])

	// 연속된 메세지 중 첫 번째 메세지 반환
	const getFirstMessagesOfGroups = (groupedMessages: Message[][]) => {
		return groupedMessages.map((group) => group[0])
	}
	// 연속된 메세지 중 해당 시간대의 마지막 메세지 반환
	const getLastMessagesOfGroups = (groupedMessages: Message[][]) => {
		return groupedMessages.map((group) => group[group.length - 1])
	}

	const groupedMessages = groupConsecutiveMessages(detail?.messages || [])
	const firstMessagesOfTime = getFirstMessagesOfGroups(groupedMessages)
	const lastMessagesOfTime = getLastMessagesOfGroups(groupedMessages)

	// 날짜가 달라지는 지점에 날짜를 추가하는 메서드
	const renderMessagesWithDates = (messages: Message[]) => {
		const elements: JSX.Element[] = []
		let lastDate: string | null = null

		messages.forEach((message, index) => {
			const messageDate = new Date(message.createdAt).toLocaleDateString('ko-KR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})

			if (messageDate !== lastDate) {
				elements.push(
					<div
						key={`date-${index}`}
						className="text-muted-foreground text-center text-xs font-medium"
					>
						{messageDate}
					</div>
				)
				lastDate = messageDate
			}

			elements.push(
				message.senderUserId === userId ? (
					<SenderChatBubble
						key={message.createdAt.toDateString()}
						text={message.text}
						images={message.images}
						messageTime={message.createdAt}
						isLastMessageOfTime={lastMessagesOfTime.includes(message)}
					/>
				) : (
					<ReceiverChatBubble
						key={message.createdAt.toDateString()}
						userImage={message.senderUser.image}
						text={message.text}
						images={message.images}
						messageTime={message.createdAt}
						isFirstMessageOfConsecutive={firstMessagesOfTime.includes(message)}
						isLastMessageOfTime={lastMessagesOfTime.includes(message)}
					/>
				)
			)
		})

		return elements
	}

	return (
		<div className="flex-1 overflow-scroll p-6">
			{isEmptyMessage ? (
				<div className="text-muted-foreground max-pc:whitespace-pre-line flex h-full items-center justify-center text-center font-medium">
					{`상대방이 외부 메신저로 유도하는 경우,\n피해가 있을 수 있으니 주의하세요!`}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{renderMessagesWithDates(detail?.messages || [])}
					<div ref={messagesEndRef} />
				</div>
			)}
		</div>
	)
}
