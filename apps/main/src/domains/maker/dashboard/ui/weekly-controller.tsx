'use client'

import { useWeeklyOrderSummaryStore } from '#/maker/dashboard/model/use-weekly-order-summary-store'
import { getMonthWeekByWeekNumber, getWeekNumber } from '~/shared'
import { DateController } from '#/maker/_ui/date-controller'

export function WeeklyController(): JSX.Element {
	const { weekNumber, year, setPrevWeek, setNextWeek } =
		useWeeklyOrderSummaryStore()
	const { month, monthWeek } = getMonthWeekByWeekNumber({ weekNumber, year })

	const today = new Date()
	const isCurrentWeek =
		today.getFullYear() === year && weekNumber === getWeekNumber(today)

	return (
		<DateController
			onNextClick={setNextWeek}
			onPrevClick={setPrevWeek}
			disabledNext={isCurrentWeek}
		>
			{year}년 {month}월 {monthWeek}주차
		</DateController>
	)
}
