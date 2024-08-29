'use client'

import { DateController } from '#/maker/_ui/date-controller'
import { useMyCalculateRecordsStore } from '../model/use-my-calculate-records-store'

export function MonthlyController(): JSX.Element {
	const { year, month, setNextMonth, setPrevMonth } =
		useMyCalculateRecordsStore()

	const todayYear = new Date().getFullYear()
	const todayMonth = new Date().getMonth() + 1

	const isMaxDate = year === todayYear && month === todayMonth

	return (
		<DateController
			className="shrink-0 bg-transparent p-0"
			onNextClick={setNextMonth}
			onPrevClick={setPrevMonth}
			disabledNext={isMaxDate}
		>
			{year}년 {month}월
		</DateController>
	)
}
