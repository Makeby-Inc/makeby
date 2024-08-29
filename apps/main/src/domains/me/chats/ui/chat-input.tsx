'use client'

import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import { Uploader } from '@design-system/template'
import { Button, Textarea, toast } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { type ChatRoomDetail } from '#/me/chats/model/chat-detail'
import { createMessageAction } from '#/me/chats/action'
import { useChatsStore } from '#/me/chats/model/use-chats-store'

export function ChatInput({
	chatRoomId,
	receiverUserId,
	disabled
}: {
	chatRoomId: string
	receiverUserId: string
	disabled?: boolean
}) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const [text, setText] = useState('')
	const [images, setImages] = useState<string[]>([])
	const isImages = images.length > 0
	const { detail, setDetail } = useChatsStore()
	const { session } = useAuth()

	const createMessage = useAction(createMessageAction, {
		onError: () => {
			toast({
				title: '메시지 전송에 실패했습니다.',
				variant: 'destructive'
			})
		}
	})

	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(e.currentTarget.value)
		// textarea 높이 조절
		if (textareaRef.current) {
			textareaRef.current.style.height = '0px'
			const scrollHeight = textareaRef.current.scrollHeight
			textareaRef.current.style.height = `${scrollHeight}px`
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	const handleSendMessage = () => {
		if (!text && !isImages) return
		if (createMessage.isExecuting) return
		createMessage.execute({
			chatRoomId,
			receiverUserId,
			text,
			images
		})
		setText('')
		setImages([])
		if (!detail) return
		const prevMessages = detail.messages
		const newMessage: ChatRoomDetail['messages'][0] = {
			text,
			images,
			receiverUser: {
				id: '',
				image: ''
			},
			senderUser: {
				id: session?.user.id || '',
				image: session?.user.image || ''
			},
			senderUserId: session?.user.id || '',
			createdAt: new Date()
		}
		setDetail({ ...detail, messages: [...prevMessages, newMessage] })
	}

	return (
		<div className="pc:p-6 pc:pt-10 grid bg-white p-0">
			<div className="pc:border pc:has-[:focus]:shadow-lg pc:rounded-md rounded-none border-t has-[:focus]:shadow-[0px_-4px_16px_-4px_rgba(0,0,0,0.1)]">
				<Textarea
					ref={textareaRef}
					value={text}
					maxLength={1000}
					onChange={onChange}
					placeholder={disabled ? '보관된 채팅방이에요' : '메시지를 입력하세요'}
					disabled={disabled}
					className="group max-h-[100px] resize-none rounded-b-none border-none p-4 focus-visible:ring-0"
					onKeyDown={handleKeyDown}
				/>

				{isImages ? (
					<div className="scrollbar-hide flex max-w-max gap-3 overflow-x-scroll p-4 pb-0">
						{images.map((src) => (
							<AttachedImage
								key={src}
								src={src}
								onDelete={() => {
									setImages((prev) => prev.filter((v) => v !== src))
								}}
							/>
						))}
					</div>
				) : null}

				<div className="border-border flex justify-between gap-2 border-t p-4 *:rounded-sm">
					<Uploader
						bucket="images"
						accept="image/*"
						onFileChange={(v) => {
							setImages([...images, v.url])
						}}
					>
						<Button
							size="sm"
							options="icon"
							variant="secondary"
							disabled={disabled}
							className="text-secondary-foreground rounded-sm"
						>
							<Icon name="PhotoIcon" size="sm" solid />
						</Button>
					</Uploader>

					<Button
						size="sm"
						className="text-background rounded"
						disabled={disabled || (!text && !isImages)}
						onClick={handleSendMessage}
					>
						보내기
						<Icon name="PaperAirplaneIcon" size="sm" solid />
					</Button>
				</div>
			</div>
		</div>
	)
}

function AttachedImage({
	src,
	onDelete
}: {
	src: string
	onDelete: () => void
}) {
	return (
		<div className="group relative shrink-0">
			<Image
				src={src}
				alt="attached image"
				width={80}
				height={80}
				className="h-20 w-20 rounded-md"
			/>
			<button
				type="button"
				onClick={onDelete}
				className="bg-foreground text-background pc:invisible pc:group-hover:visible absolute -right-[9px] -top-[9px] rounded-sm p-1"
			>
				<Icon name="XMarkIcon" size="sm" />
			</button>
		</div>
	)
}
