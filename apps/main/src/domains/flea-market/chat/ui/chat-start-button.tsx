'use client'

import { useAction } from '@core/react'
import { Button, toast } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import { useRouter } from 'next/navigation'
import { createChatroomAction } from '#/flea-market/chat/action'

export function ChatStartButton({
	productId,
	sellerId
}: {
	productId: string
	sellerId: string
}) {
	const { session } = useAuth()
	const isMyProduct = session?.user.id === sellerId
	const router = useRouter()

	const createChatroom = useAction(createChatroomAction, {
		onSuccess: ({ data }) => {
			router.push(`/me/chats/${data?.chatroomId}`)
		},
		onError: () => {
			toast({
				title: '채팅방 생성에 실패했습니다.',
				description: '새로고침 후 다시 시도해주세요.',
				variant: 'destructive'
			})
		}
	})

	const handleChat = () => {
		if (isMyProduct) {
			router.push(`/fleamarket/products/edit/${productId}`)
		} else {
			createChatroom.execute({
				fleaMarketProductId: productId,
				receiverUserId: sellerId
			})
		}
	}

	return (
		<Button size="lg" className="w-full" onClick={handleChat}>
			{isMyProduct ? '수정하기' : '채팅하기'}
		</Button>
	)
}
