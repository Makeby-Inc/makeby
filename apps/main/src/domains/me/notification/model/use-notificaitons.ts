'use client'

import { useAction } from '@core/react'
import { useAuth } from '@providers/auth'
import { useEffect, useState } from 'react'
import { useNotificationsStore } from '#/me/notification/model/use-notifications-store'
import { getMyNotifications } from '#/me/notification/action'

export function useNotifications() {
	const { isAuthenticated } = useAuth()
	const { setItems, items } = useNotificationsStore()
	const [initLoaded, setInitLoaded] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const getAction = useAction(getMyNotifications, {
		onSuccess: ({ data }) => {
			if (data) {
				setItems(data)
				setInitLoaded(true)
			}
		}
	})

	useEffect(() => {
		if (!isAuthenticated) return
		getAction.execute()

		const interval = setInterval(() => {
			getAction.execute()
		}, 10 * 1000)

		return () => {
			clearInterval(interval)
		}
	}, [isAuthenticated])

	useEffect(() => {
		if (refreshing) {
			getAction.execute()
			setRefreshing(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshing])

	return {
		items,
		initLoaded,
		refreshing,
		setRefreshing,
		loading: getAction.isExecuting
	}
}
