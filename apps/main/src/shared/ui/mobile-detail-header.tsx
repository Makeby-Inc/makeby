'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { useRouter } from 'next/navigation'

interface MobileDetailHeaderProps {
	fallbackUrl?: string
	pageTitle?: React.ReactNode
	rightAction?: React.ReactNode
	rightActionClassName?: string
}

export function MobileDetailHeader({
	fallbackUrl = '/',
	pageTitle = '',
	rightAction,
	rightActionClassName
}: MobileDetailHeaderProps) {
	const router = useRouter()
	const onCancel = () => {
		const hasHistory = window.history.length > 1
		if (hasHistory) {
			router.back()
		}

		router.push(fallbackUrl)
	}
	return (
		<header className="pc:hidden bg-background sticky top-0 z-50 h-fit w-full border-b ">
			<section className="flex items-center justify-between gap-4 py-4">
				<button onClick={onCancel} type="button">
					<Icon name="ArrowLeftIcon" />
				</button>
				<div className="flex-1 text-center font-medium">{pageTitle}</div>
				<div className={cn('flex w-6 items-center', rightActionClassName)}>
					{rightAction}
				</div>
			</section>
		</header>
	)
}
