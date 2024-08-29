'use client'

import { Icon } from '@design-system/icon'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetClose,
	Button
} from '@design-system/ui'
import { NotificationList } from '#/me/notification/ui/notification-list'
import { useNotificationsStore } from '#/me/notification/model'
import { NotificationButton } from './notification-button'

export function NotificationSheet({ className }: { className?: string }) {
	const { items } = useNotificationsStore()
	const unreadCount = items.filter((item) => !item.isRead).length

	return (
		<Sheet>
			<SheetTrigger className={className} asChild>
				<NotificationButton unreadCount={unreadCount} />
			</SheetTrigger>
			<SheetContent hideClose className="w-[500px]">
				<SheetHeader className="flex-row items-center justify-between">
					<SheetTitle className="text-2xl">알림</SheetTitle>
					<SheetClose>
						<Button variant="ghost" options="icon">
							<Icon name="XMarkIcon" className="h-8 w-8" />
						</Button>
					</SheetClose>
				</SheetHeader>
				<NotificationList />
			</SheetContent>
		</Sheet>
	)
}
