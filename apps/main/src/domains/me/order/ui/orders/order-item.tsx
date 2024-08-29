'use client'
import { cn } from '@core/utils'
import Image from 'next/image'
import { type OrderDeliveryStatus } from '@core/models'
import { Badge } from '@design-system/ui'
import { type MyOrderItem } from '#/me/order/model/my-order-item'
import { OrderActions } from '#/me/order/ui/order-actions/order-actions'

interface OrderItemProps {
	item: MyOrderItem
	className?: string
	noActions?: boolean
}

export function OrderItem({
	item,
	className,
	noActions = false
}: OrderItemProps): JSX.Element {
	const deliveryStatusMap: Record<OrderDeliveryStatus, string> = {
		PENDING: '결제완료',
		SENT: '발송완료',
		CANCELED: '주문취소',
		EXCHANGED: '교환 신청',
		RETURNED: '반품신청',
		CONFIRMED: '구매확정'
	}

	const statusLabel = deliveryStatusMap[item.deliveryStatus]
	const isNotPending = item.deliveryStatus !== 'PENDING'

	return (
		<div className={cn('', className)}>
			<div className="flex items-center justify-between">
				<div className="flex gap-4 py-6">
					<Image
						src={item.option.thumbnailUrl}
						alt={item.option.title}
						width={120}
						height={120}
						className="max-pc:w-[60px] max-pc:h-[60px] aspect-square"
					/>
					<div className="grid">
						<span className="mb-1 text-xs">
							{item.option.product.maker.businessName}
						</span>
						<div className="grid gap-2">
							<div className="flex items-center gap-1">
								{isNotPending ? (
									<Badge size="sm" variant="secondary">
										{statusLabel}
									</Badge>
								) : null}
								<h5 className="font-semibold">{item.option.product.title}</h5>
							</div>
							<div className=" text-secondary-foreground text-sm">
								{item.option.title} / {item.quantity}개
							</div>
							<span className="text-sm font-semibold">
								{item.totalPrice.toLocaleString()}원
							</span>
						</div>
					</div>
				</div>

				{!noActions && (
					<div className="grid h-fit gap-2">
						<OrderActions item={item} />
					</div>
				)}
			</div>
		</div>
	)
}
