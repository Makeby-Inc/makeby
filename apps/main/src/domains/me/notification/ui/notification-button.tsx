'use client'

import { Icon } from '@design-system/icon'
import { RedDot } from '~/shared/ui/red-dot'
import { useNotifications } from '../model'

interface NotificationButtonProps {
	unreadCount?: number
	onClick?: () => void
}

export function NotificationButton({
	unreadCount,
	onClick
}: NotificationButtonProps): JSX.Element {
	const { items } = useNotifications()
	const unreadItemsCount = items.filter((i) => !i.isRead).length

	return (
		<button type="button" className="relative overflow-visible" onClick={onClick}>
			<Icon name="BellAlertIcon" className="inline-flex self-center" />
			{unreadItemsCount > 0 && <RedDot count={unreadCount} />}
		</button>
	)
}
