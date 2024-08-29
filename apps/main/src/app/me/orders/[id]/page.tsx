import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Icon } from '@design-system/icon'
import { getMyOrderDetailAction } from '#/me'
import { MobileDetailHeader } from '~/shared'
import { OrderListItem } from '#/me/order/ui/orders/order-list-item'
import { OrderDeliveryInfo } from '#/me/order/ui/orders/order-delivery-info'
import { OrderPaymentInfo } from '#/me/order/ui/orders/order-payment-info'

interface MyOrderDetailPageProps {
	params: {
		id: string
	}
}

export const metadata = {
	title: '주문 상세'
}

export default async function MyOrderDetailPage({
	params
}: MyOrderDetailPageProps) {
	const { id } = params
	const orderData = await getMyOrderDetailAction({ id })

	if (!orderData?.data) notFound()
	const order = orderData.data

	return (
		<>
			<MobileDetailHeader pageTitle="주문 상세" fallbackUrl="/me/orders" />
			<section className="pc:py-[60px] pc:w-[640px] grid gap-10 py-6">
				<div className="grid gap-4">
					<Link className="max-pc:hidden flex items-center gap-1" href="/me/orders">
						<Icon name="ChevronLeftIcon" />
						<h1 className="text-xl font-semibold">주문 상세 내역</h1>
					</Link>
					<OrderListItem order={order} noLink />
				</div>
				<OrderDeliveryInfo {...order} />
				<OrderPaymentInfo
					deliveryCost={order.deliveryFee}
					paymentMethod={order.paymentType}
					totalPaymentPrice={order.totalPaymentAmount}
					totalPrice={order.totalPrice}
					usedPoint={order.usedPoint}
				/>
			</section>
		</>
	)
}
