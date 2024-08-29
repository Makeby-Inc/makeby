import { notFound } from 'next/navigation'
import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import Link from 'next/link'
import { getMyOrderDetailAction } from '#/me/order/action'
import {
	OrderDeliveryInfo,
	OrderListItem,
	OrderPaymentInfo
} from '#/me/order/ui'
import { MobileDetailHeader } from '~/shared'

interface OrderCompletedPageProps {
	params: {
		id: string
	}
}

export const metadata = {
	title: '주문 완료'
}

export default async function OrderCompletedPage({
	params
}: OrderCompletedPageProps) {
	const { id } = params
	const orderData = await getMyOrderDetailAction({ id })

	if (!orderData?.data) notFound()
	const order = orderData.data

	return (
		<>
			<MobileDetailHeader pageTitle="주문 완료" fallbackUrl="/shop/products" />
			<section className="pc:py-[60px] pc:gap-[60px] grid max-w-[640px] gap-10 py-4">
				<div className="flex flex-col items-center gap-6 py-4 text-center">
					<Icon
						className="text-primary h-[72px] w-[72px]"
						name="CheckCircleIcon"
						solid
					/>
					<h1 className="text-2xl font-semibold">주문이 완료되었어요</h1>
					<h5 className="text-primary text-lg font-medium">
						주문번호 {order.orderNumber}
					</h5>
				</div>

				<OrderListItem order={order} noLink noActions />
				<OrderDeliveryInfo {...order} />
				<OrderPaymentInfo
					deliveryCost={order.deliveryFee}
					paymentMethod={order.paymentType}
					totalPaymentPrice={order.totalPaymentAmount}
					totalPrice={order.totalPrice}
					usedPoint={order.usedPoint}
				/>

				<div className="py-10">
					<div className="flex items-center gap-2">
						<Button className="flex-1" asChild variant="outline" size="lg">
							<Link href={`/me/orders/${id}`}>주문 상세 확인</Link>
						</Button>
						<Button className="flex-1" asChild size="lg">
							<Link href="/shop/products">쇼핑 계속하기</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	)
}
