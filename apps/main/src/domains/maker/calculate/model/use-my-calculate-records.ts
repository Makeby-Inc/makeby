'use client'

import { useEffect } from 'react'
import { useAction } from '@core/react'
import { getMyCalculateRecordsAction } from '../action/get-my-calculate-records'
import { useMyCalculateRecordsStore } from './use-my-calculate-records-store'

export function useMyCalculateRecords() {
	const { year, month, productId, records, setRecords } =
		useMyCalculateRecordsStore()
	const getAction = useAction(getMyCalculateRecordsAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setRecords(data)
			}
		}
	})
	const loading = getAction.isExecuting

	useEffect(() => {
		if (!loading) {
			getAction.execute({ year, month, productId })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [year, month, productId])

	return {
		year,
		month,
		productId,
		loading,
		records
	}
}
