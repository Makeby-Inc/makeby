import {
	OrderInfoTemplate,
	type OrderInfoTemplateProps
} from '#/me/order/ui/orders/order-info-template'

interface OrderPaymentInfoProps {
	paymentMethod: string
	usedPoint: number
	totalPaymentPrice: number
	deliveryCost: number
	totalPrice: number
	className?: string
}

export function OrderPaymentInfo({
	paymentMethod,
	usedPoint,
	totalPaymentPrice,
	deliveryCost,
	totalPrice
}: OrderPaymentInfoProps): JSX.Element {
	function formatPrice(price: number) {
		return `${price.toLocaleString()}원`
	}

	const data: OrderInfoTemplateProps = {
		title: '결제 정보',
		alignBetween: true,
		items: [
			{
				title: '결제 수단',
				value: paymentMethod
			},
			{
				title: '총 제품 가격',
				value: formatPrice(totalPrice)
			},
			{
				title: '배송비',
				value: formatPrice(deliveryCost)
			},
			{
				title: '포인트 사용',
				value: `- ${formatPrice(usedPoint)}`,
				valueClassName: 'text-primary'
			},
			{
				title: '최종 결제 금액',
				value: formatPrice(totalPaymentPrice),
				valueClassName: 'text-xl font-bold'
			}
		]
	}

	return <OrderInfoTemplate {...data} />
}
