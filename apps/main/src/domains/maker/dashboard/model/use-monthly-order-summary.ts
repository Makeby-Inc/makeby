'use client'

import { useEffect } from 'react'
import { useAction } from '@core/react'
import { useMonthlyOrderSummaryStore } from '#/maker/dashboard/model/use-monthly-order-summary-store'
import { getMonthlyOrderSummaryAction } from '#/maker/dashboard/action/get-monthly-order-summary'

export function useMonthlyOrderSummary() {
	const {
		year,
		month,
		totalOrderAmount,
		totalCancelAmount,
		totalExchangeAmount,
		totalRevenue,
		setData
	} = useMonthlyOrderSummaryStore()

	const getData = useAction(getMonthlyOrderSummaryAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setData(data)
			}
		}
	})

	useEffect(() => {
		getData.execute({ month, year })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month])

	return {
		loading: getData.isExecuting,
		totalOrderAmount,
		totalCancelAmount,
		totalExchangeAmount,
		totalRevenue
	}
}
