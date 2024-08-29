'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { ko } from 'date-fns/locale'

function LeftIcon() {
	return <Icon className="h-3.5 w-3.5" name="ChevronLeftIcon" />
}
function RightIcon() {
	return <Icon className="h-3.5 w-3.5" name="ChevronRightIcon" />
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	locale = ko,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			className={cn('p-lg', className)}
			classNames={{
				months: 'flex flex-col gap-y-sm',
				month: 'space-y-sm',
				caption: 'flex justify-center relative items-center h-[30px]',
				caption_label: 'text-sm font-medium',
				nav: 'space-x-1 flex items-center',
				nav_button:
					'p-xs text-muted-foreground border-border rounded-md flex items-center justify-center border',
				nav_button_previous: 'absolute left-0',
				nav_button_next: 'absolute right-0',
				table: 'w-full border-collapse space-y-sm',
				head_row: 'grid grid-cols-7 place-items-center',
				head_cell:
					'text-foreground text-sm font-normal min-w-[36px] w-full aspect-square text-center flex items-center justify-center',
				row: 'grid grid-cols-7 mt-sm',
				cell: 'text-center text-sm p-0 relative',
				day: 'flex items-center justify-center min-w-[36px] w-full aspect-square text-foreground bg-background hover:bg-hover rounded-sm',
				day_selected:
					'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
				day_today: '',
				day_outside: 'text-muted-foreground',
				day_disabled: 'text-muted-foreground pointer-events-none',
				day_range_middle: '!bg-secondary !rounded-none !text-foreground',
				day_hidden: 'invisible',
				day_range_start: 'rounded-r-none',
				day_range_end: 'rounded-l-none',
				...classNames
			}}
			components={{
				IconLeft: LeftIcon,
				IconRight: RightIcon
			}}
			locale={locale}
			showOutsideDays={showOutsideDays}
			{...props}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
