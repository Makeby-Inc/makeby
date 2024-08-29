'use client'
import { cn } from '@core/utils'
import { useCreateOrderStore } from '#/shop/order/model'
import { useShippingFee } from '#/shop/order/model/use-shipping-fee'
import { RATIO_OF_POINTS_EARNED } from '~/shared/lib'

interface OrderSummaryProps {
	totalQuantity: number
	totalProductPrice: number
}

export function OrderSummary({
	totalQuantity,
	totalProductPrice
}: OrderSummaryProps): JSX.Element {
	const { usedPoints, deliveryInfo } = useCreateOrderStore()

	const deliveryCost = useShippingFee(deliveryInfo?.postalCode)
	const totalQuantityText = `${totalQuantity.toLocaleString()}개`
	const totalProductPriceText = `${totalProductPrice.toLocaleString()}원`
	const deliveryCostText = `${deliveryCost.toLocaleString()}원`
	const usedPointsText = `-${usedPoints.toLocaleString()}원`

	const totalPaymentAmount = totalProductPrice + deliveryCost - usedPoints
	const totalPaymentAmountText = `${totalPaymentAmount.toLocaleString()}원`
	const expectedPoints = Math.floor(totalPaymentAmount * RATIO_OF_POINTS_EARNED)
	const expectedPointsText = `${expectedPoints.toLocaleString()}원`
	const ratioOfPoints = `${RATIO_OF_POINTS_EARNED * 100}%`

	return (
		<div className={cn('grid gap-6')}>
			<h2 className="pc:text-2xl text-2xl font-semibold">주문 정보</h2>
			<ul className="grid gap-3 border-b border-t py-3">
				<ListItem label="총 수량" value={totalQuantityText} />
				<ListItem label="총 상품금액" value={totalProductPriceText} />
				<ListItem label="배송비" value={deliveryCostText} />
				<span className="text-secondary-foreground text-xs">
					*제주 및 도서산간 지역의 경우 추가 배송비가 부과됩니다.
				</span>
				{usedPoints > 0 && <ListItem label="사용 포인트" value={usedPointsText} />}
			</ul>
			<div>
				<div className="flex justify-between text-xl font-bold">
					<span>총 결제금액</span>
					<span>{totalPaymentAmountText}</span>
				</div>
				<div className="text-primary flex justify-between font-medium">
					<p>적립 예정 포인트({ratioOfPoints})</p>
					<p>{expectedPointsText}</p>
				</div>
			</div>
		</div>
	)
}

interface ListItemProps {
	label: string
	value: string
}

function ListItem({ label, value }: ListItemProps): JSX.Element {
	return (
		<li className="flex justify-between font-medium">
			<span>{label}</span>
			<span>{value}</span>
		</li>
	)
}
