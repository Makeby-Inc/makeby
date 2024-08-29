'use client'

import { useMonthlyOrderSummaryStore } from '#/maker/dashboard/model/use-monthly-order-summary-store'
import { DateController } from '#/maker/_ui/date-controller'

export function MonthlyController(): JSX.Element {
	const { year, month, setNextMonth, setPrevMonth } =
		useMonthlyOrderSummaryStore()

	const todayYear = new Date().getFullYear()
	const todayMonth = new Date().getMonth() + 1

	const isMaxDate = year === todayYear && month === todayMonth

	return (
		<DateController
			onNextClick={setNextMonth}
			onPrevClick={setPrevMonth}
			disabledNext={isMaxDate}
		>
			{year}년 {month}월
		</DateController>
	)
}
