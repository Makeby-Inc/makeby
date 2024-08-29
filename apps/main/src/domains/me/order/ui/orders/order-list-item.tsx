import { type PaymentStatus } from '@core/models'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import { cn } from '@core/utils'
import { type MyOrder } from '#/me/order/model/my-order-include'
import { OrderItem } from '#/me/order/ui/orders/order-item'

interface OrderListItemProps {
	order: MyOrder
	noLink?: boolean
	noActions?: boolean
}

export function OrderListItem({
	order,
	noLink = false,
	noActions = false
}: OrderListItemProps): JSX.Element {
	return (
		<div className="border-primary border-t-2">
			<Link
				href={`/me/orders/${order.id}`}
				className={cn(
					'flex items-center justify-between gap-2 border-b py-4',
					noLink && 'pointer-events-none'
				)}
			>
				<div className="flex items-center gap-2 text-sm">
					<span>주문일자</span>
					<span className="font-semibold">
						{order.createdAt.toLocaleDateString('ko-KR')}
					</span>
				</div>
				{!noLink && <Icon name="ChevronRightIcon" size="sm" />}
			</Link>

			<ul className="divide-y">
				{order.orderItems.map((item) => (
					<OrderItem key={item.id} item={item} noActions={noActions} />
				))}
			</ul>
		</div>
	)
}

const paymentStatusMap: Record<PaymentStatus, string> = {
	PENDING: '입금 대기',
	COMPLETED: '결제 완료',
	CANCELED: '결제 취소'
}
