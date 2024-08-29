'use client'
import { type DeliveryInformation } from '@core/models'
import { cn } from '@core/utils'
import { Button } from '@design-system/ui'
import { useDialogStore } from '@core/react'
import { DeliveryInfo } from '#/me/order/ui/delivery-info/delivery-info'

interface SelectedDeliveryInfoCardProps {
	deliveryInfo: DeliveryInformation
	className?: string
}

export function SelectedDeliveryInfoCard({
	deliveryInfo,
	className
}: SelectedDeliveryInfoCardProps): JSX.Element {
	const { toggleDialog } = useDialogStore()

	return (
		<div className="grid gap-2">
			<span className="font-semibold">배송지</span>
			<div
				className={cn('flex items-center gap-6 rounded-2xl border p-6', className)}
			>
				<DeliveryInfo deliveryInfo={deliveryInfo} className="flex-1" />
				<Button
					onClick={() => {
						toggleDialog('isDeliveryInfoListModalOpened')
					}}
					size="sm"
					variant="outline"
					className="whitespace-nowrap"
				>
					변경
				</Button>
			</div>
		</div>
	)
}
