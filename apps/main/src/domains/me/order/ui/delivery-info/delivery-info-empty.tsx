import { cn } from '@core/utils'
import { CreateDeliveryInfoModal } from '#/me/order/ui/delivery-info/create-delivery-info-modal'

export function DeliveryInfoEmpty(): JSX.Element {
	return (
		<div
			className={cn('bg-secondary flex items-center gap-6 rounded-2xl border p-6')}
		>
			<span className="text-secondary-foreground flex-1">
				배송지를 등록해 주세요
			</span>
			<CreateDeliveryInfoModal />
		</div>
	)
}
