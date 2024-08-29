import { getMyOrdersAction } from '#/me'
import { OrderList } from '#/me/order/ui/orders/order-list'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '내 주문 내역'
}

export default async function MyOrderLstPage() {
	const myOrders = await getMyOrdersAction()

	return (
		<>
			<MobileDetailHeader pageTitle="내 주문 내역" fallbackUrl="/me" />
			<section className="pc:w-[640px] pc:pt-10 pt-6">
				<h1 className="max-pc:hidden mb-10 text-4xl font-semibold">주문 내역</h1>
				<OrderList orders={myOrders?.data || []} />
			</section>

			<div className="h-[120px]" />
		</>
	)
}
