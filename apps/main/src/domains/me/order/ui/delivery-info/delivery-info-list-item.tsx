'use client'
import { type DeliveryInformation } from '@core/models'
import { cn } from '@core/utils'
import { Button } from '@design-system/ui'
import { useDialogStore } from '@core/react/zustand'
import { DeliveryInfo } from '#/me/order/ui/delivery-info/delivery-info'
import { useCreateOrderStore } from '#/shop/order/model/use-create-order-store'
import { useUpdateDeliveryInfoStore } from '#/me/order/model'

interface DeliveryInfoListItemProps {
	deliveryInfo: DeliveryInformation
	inCheckout?: boolean
	isSelected?: boolean
}

export function DeliveryInfoListItem({
	deliveryInfo,
	inCheckout,
	isSelected
}: DeliveryInfoListItemProps): JSX.Element {
	const { toggleDialog } = useDialogStore()

	const { setDeliveryInfo } = useCreateOrderStore()
	const { setData } = useUpdateDeliveryInfoStore()

	return (
		<div
			className={cn(
				'grid gap-6 rounded-2xl border p-6',
				inCheckout && isSelected && 'border-primary border-2'
			)}
		>
			<DeliveryInfo deliveryInfo={deliveryInfo} />
			<div className="flex items-center justify-between">
				<Button
					size="sm"
					variant="outline"
					onClick={() => {
						setData(deliveryInfo)
						toggleDialog('isUpdateDeliveryInfoModalOpened')
					}}
				>
					수정
				</Button>
				{inCheckout && !isSelected ? (
					<Button
						size="sm"
						type="button"
						onClick={() => {
							setDeliveryInfo(deliveryInfo)
							toggleDialog('isDeliveryInfoListModalOpened')
						}}
					>
						선택
					</Button>
				) : null}
			</div>
		</div>
	)
}
