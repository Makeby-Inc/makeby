'use client'

import { cn } from '@core/utils'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useChats } from '#/me/chats/model/use-chats'
import { useChatsStore } from '#/me/chats/model/use-chats-store'
import { ChatItem } from '#/me/chats/ui/chat-item'
import { LoadingSpinner } from '~/shared/ui/loading-spinner'

export function ChatSidebar({ className }: { className?: string }) {
	const { list } = useChatsStore()
	const { loading } = useChats()
	const hasChat = list.length > 0
	const pathname = usePathname()
	const shouldHideSidebarInMobile = pathname.startsWith('/me/chats/')

	const [shouldShowLoading, setShouldShowLoading] = useState(true)
	const [isInitLoad, setIsInitLoad] = useState(true)

	useEffect(() => {
		const interval = setInterval(
			() => {
				isInitLoad && setShouldShowLoading(false)
				setIsInitLoad(false)
			},
			hasChat ? 3500 : 1000
		)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div
			className={cn(
				'pc:w-[400px] scrollbar-hide w-full overflow-scroll',
				shouldHideSidebarInMobile && 'max-pc:hidden',
				className
			)}
		>
			{hasChat ? (
				<div className="grid divide-y">
					{list.map((chat, index) => (
						<ChatItem key={chat.id} data={chat} isTopChat={index === 0} />
					))}
				</div>
			) : (
				<div className="flex h-full w-full items-center justify-center">
					{shouldShowLoading ? (
						<div className="flex h-full w-full items-center justify-center">
							<LoadingSpinner />
						</div>
					) : (
						<div className="grid gap-1 text-center">
							<span className="text-secondary-foreground text-xl font-semibold">
								아직 진행중인 채팅이 없어요
							</span>
							<span className="text-muted-foreground font-medium">
								새로운 대화를 시작해보세요
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
