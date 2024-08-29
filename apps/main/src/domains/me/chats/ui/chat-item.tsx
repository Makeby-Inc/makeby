'use client'

import { cn, timeFromPast } from '@core/utils'
import { Skeleton } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { type ChatListItem } from '#/me/chats/model'
import { ProfileAvatar } from '~/shared'

interface ChatItemProps {
	data: ChatListItem
	isTopChat?: boolean
}
export function ChatItem({ data, isTopChat }: ChatItemProps) {
	const {
		id: chatRoomId,
		fleaMarketProduct,
		messages,
		senderUserId,
		senderUser,
		receiverUser
	} = data
	const { session, status } = useAuth()
	const { id } = useParams()

	if (status === 'loading') {
		return (
			<div className="p-1">
				<Skeleton className="h-20 w-full rounded-sm" />
			</div>
		)
	}

	const isActive = id ? chatRoomId === id : isTopChat // 채팅 상세 페이지일 경우 해당하는 채팅 활성화, 아닐 경우 최근 채팅 활성화
	const isSender = session?.user.id === senderUserId
	const productImage = fleaMarketProduct.productImages.find(
		(image) => image.isPrimary
	)?.imageUrl
	const userImage = isSender ? receiverUser.image : senderUser.image
	const userName = isSender ? receiverUser.name : senderUser.name
	const lastMessage = messages[0]
	const unReadCount = messages.filter((message) =>
		isSender ? !message.isSenderRead : !message.isReceiverRead
	).length

	return (
		<Link
			href={`/me/chats/${chatRoomId}`}
			className="hover:bg-hover flex items-center gap-4 p-4"
		>
			<div
				className={cn(
					'relative h-12 w-12 shrink-0 grayscale',
					isActive && 'grayscale-0'
				)}
			>
				<ProfileAvatar
					imageUrl={userImage}
					name={userName}
					size="xs"
					className="absolute left-0 top-0 h-[30px] w-[30px] rounded-full"
				/>
				<ProfileAvatar
					imageUrl={productImage || ''}
					name="상품 이미지"
					className="border-foreground/[0.03] absolute bottom-0 right-0 h-[30px] w-[30px] rounded-sm border"
					isDefaultLogo
				/>
			</div>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="text-sm font-semibold">{userName}</span>
					{lastMessage ? (
						<span className="text-xs">{timeFromPast(lastMessage.createdAt)} 전</span>
					) : null}
				</div>
				<div className="text-secondary-foreground line-clamp-1 text-sm">
					{lastMessage ? lastMessage.text : '대화를 시작해보세요!'}
				</div>
			</div>

			{unReadCount > 0 && (
				<div className="bg-primary text-background flex items-center justify-center rounded-full px-2 py-1 text-xs">
					{unReadCount}
				</div>
			)}
		</Link>
	)
}
