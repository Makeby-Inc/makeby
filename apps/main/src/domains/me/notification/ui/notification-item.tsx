'use client'

import { cn, timeFromPast } from '@core/utils'
import { Icon } from '@design-system/icon'
import { type Notification } from '@core/models'
import { useRouter } from 'next/navigation'
import { useAction } from '@core/react'
import { readMyNotificationAction } from '#/me/notification/action'

export function NotificationItem({
	id,
	notificationType,
	content,
	isRead,
	link,
	createdAt
}: Notification) {
	const readAction = useAction(readMyNotificationAction)
	const router = useRouter()

	const clickAble = link || !isRead

	function handleClick() {
		if (!isRead) {
			readAction.execute({ id })
		}

		if (link) {
			router.push(link)
		}
	}

	return (
		<button
			onClick={handleClick}
			className={cn(
				'bg-background group flex w-full justify-between gap-4 rounded py-5 text-start transition-colors',
				clickAble && 'hover:bg-base-100',
				!clickAble && 'pointer-events-none'
			)}
		>
			<div
				className={cn(
					'flex w-full gap-4',
					clickAble && 'transition-transform group-hover:scale-90'
				)}
			>
				<div className="flex flex-1 gap-4">
					<div
						className={cn(
							'bg-primary/10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
							isRead && 'bg-muted'
						)}
					>
						<Icon
							className={cn(
								'text-primary shrink-0',
								isRead && 'text-muted-foreground'
							)}
							solid
							name="BellIcon"
						/>
					</div>
					<div className="flex-1">
						<div
							className={cn(
								'shrink-0 font-semibold',
								isRead && 'text-muted-foreground'
							)}
						>
							{notificationType}
						</div>
						<div
							className={cn('shrink-0 text-sm', isRead && 'text-muted-foreground')}
						>
							{content}
						</div>
					</div>
				</div>
				<div className={cn('shrink-0 text-sm', isRead && 'text-muted-foreground')}>
					{timeFromPast(createdAt)} 전
				</div>
			</div>
		</button>
	)
}
