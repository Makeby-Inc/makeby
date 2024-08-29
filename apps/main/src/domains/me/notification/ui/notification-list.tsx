'use client'
import { cn } from '@core/utils'
import { Button, Skeleton } from '@design-system/ui'
import { useAuth } from '@providers/auth'
import Link from 'next/link'
import { NotificationItem } from '#/me/notification/ui/notification-item'
import { AllReadButton } from '#/me/notification/ui/all-read-button'
import {
	useNotifications,
	useNotificationsStore
} from '#/me/notification/model'
import { EmptyContent } from '~/shared/ui/empty-content'

export function NotificationList(): JSX.Element {
	const { items } = useNotificationsStore()
	const { initLoaded } = useNotifications()
	const { isUnauthenticated } = useAuth()
	const allRead = items.every((i) => i.isRead)

	if (isUnauthenticated) {
		return (
			<EmptyContent
				title="로그인 후 확인할 수 있어요"
				actionSlot={
					<Button asChild>
						<Link href="/start">로그인하기</Link>
					</Button>
				}
			/>
		)
	}

	return (
		<div className={cn('grid gap-5')}>
			{initLoaded ? (
				<div className="grid gap-2">
					{!allRead && (
						<div>
							<AllReadButton />
						</div>
					)}
					<ul className="flex flex-col">
						{items.map((i) => (
							<li key={i.id} className="w-full">
								<NotificationItem {...i} />
							</li>
						))}
					</ul>
				</div>
			) : (
				<ul className="grid gap-5">
					{Array.from({
						length: 5
					}).map((_, i) => (
						<Skeleton key={i} className="round h-10 w-full" />
					))}
				</ul>
			)}
		</div>
	)
}
