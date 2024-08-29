'use client'
import { useAction } from '@core/react'
import { cn } from '@core/utils'
import { Button, useToast } from '@design-system/ui'
import { allReadMyNotificationsAction } from '#/me/notification/action'
import { useNotifications } from '../model'

export function AllReadButton(): JSX.Element {
	const { toast } = useToast()
	const { setRefreshing } = useNotifications()
	const allRead = useAction(allReadMyNotificationsAction, {
		onSuccess: () => {
			toast({
				title: '모든 알림을 읽음 처리했어요'
			})
			setRefreshing(true)
		}
	})

	return (
		<Button onClick={() => allRead.execute()} variant="outline" size="sm">
			모두 읽음 처리
		</Button>
	)
}
