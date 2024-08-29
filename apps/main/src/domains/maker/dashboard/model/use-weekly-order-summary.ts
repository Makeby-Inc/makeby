'use client'

import { useAction } from '@core/react'
import { useEffect } from 'react'
import { getWeeklyOrderSummaryAction } from '#/maker/dashboard/action/get-weekly-order-summary'
import { useWeeklyOrderSummaryStore } from '#/maker/dashboard/model/use-weekly-order-summary-store'

export function useWeeklyOrderSummary() {
	const { setData, year, weekNumber } = useWeeklyOrderSummaryStore()
	const getData = useAction(getWeeklyOrderSummaryAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setData(data)
			}
		}
	})

	useEffect(() => {
		getData.execute({ year, weekNumber })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, weekNumber])

	return {
		year,
		weekNumber,
		loading: getData.isExecuting
	}
}
