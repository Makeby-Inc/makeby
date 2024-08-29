import { type DeliveryInformation } from '@core/models'
import { Badge, Separator } from '@design-system/ui'

interface DeliveryInfoProps {
	deliveryInfo: DeliveryInformation
	className?: string
}

export function DeliveryInfo({
	deliveryInfo,
	className
}: DeliveryInfoProps): JSX.Element {
	return (
		<div className={className}>
			{deliveryInfo.isPrimary ? (
				<Badge variant="secondary" className="mb-2 w-fit">
					기본 배송지
				</Badge>
			) : null}
			<div className="grid gap-1">
				<div className="flex items-center gap-2 font-semibold">
					<span>{deliveryInfo.addressLabel}</span>
					<Separator orientation="vertical" />
					<span>{deliveryInfo.addressee}</span>
				</div>
				<p className="text-secondary-foreground text-sm">
					{deliveryInfo.address}, {deliveryInfo.detailAddress}
				</p>
				<p className="text-secondary-foreground text-sm">
					{deliveryInfo.phoneNumber}
				</p>
			</div>
		</div>
	)
}
