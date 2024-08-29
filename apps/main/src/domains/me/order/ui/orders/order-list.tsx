import { cn } from '@core/utils'
import { type MyOrder } from '#/me/order/model/my-order-include'
import { OrderListItem } from '#/me/order/ui/orders/order-list-item'
import { EmptyContent } from '~/shared/ui/empty-content'

interface OrderListProps {
	orders: MyOrder[]
}

export function OrderList({ orders }: OrderListProps): JSX.Element {
	return (
		<div className={cn('grid gap-6')}>
			{orders.map((order) => (
				<OrderListItem key={order.id} order={order} />
			))}

			{orders.length === 0 && <EmptyContent title="주문 내역이 없어요" />}
		</div>
	)
}
