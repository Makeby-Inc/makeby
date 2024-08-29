export interface Message {
	createdAt: Date
	senderUserId: string
	text: string | null
	images: string[]
	receiverUser: {
		id: string
		image: string
	}
	senderUser: {
		id: string
		image: string
	}
}

// 연속된 메세지들을 그룹화
const groupConsecutiveMessages = (messages: Message[]) => {
	const groupedMessages: Message[][] = []
	let currentGroup: Message[] = []
	let currentTime: number | null = null
	let currentSender: string | null = null

	messages.forEach((message) => {
		const messageTime = new Date(message.createdAt).getMinutes()

		if (messageTime !== currentTime || message.senderUserId !== currentSender) {
			if (currentGroup.length > 0) {
				groupedMessages.push(currentGroup)
			}
			currentGroup = [message]
			currentTime = messageTime
			currentSender = message.senderUserId
		} else {
			currentGroup.push(message)
		}
	})

	if (currentGroup.length > 0) {
		groupedMessages.push(currentGroup)
	}

	return groupedMessages
}

export { groupConsecutiveMessages }
