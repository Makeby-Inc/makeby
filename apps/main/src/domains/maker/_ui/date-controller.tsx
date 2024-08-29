'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'

interface DateControllerProps {
	disabledNext?: boolean
	children?: React.ReactNode
	className?: string
	onPrevClick: () => void
	onNextClick: () => void
}

export function DateController({
	disabledNext = false,
	children,
	className,
	onPrevClick,
	onNextClick
}: DateControllerProps): JSX.Element {
	return (
		<div
			className={cn(
				'bg-secondary flex items-center gap-2 rounded-2xl p-4 text-xl font-semibold',
				className
			)}
		>
			<Button options="icon" size="sm" variant="ghost" onClick={onPrevClick}>
				<Icon name="ChevronLeftIcon" />
			</Button>
			<div>{children}</div>
			<Button
				options="icon"
				size="sm"
				variant="ghost"
				onClick={onNextClick}
				disabled={disabledNext}
			>
				<Icon name="ChevronRightIcon" />
			</Button>
		</div>
	)
}
