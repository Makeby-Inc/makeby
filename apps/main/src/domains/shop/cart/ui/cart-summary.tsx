import { cn } from '@core/utils'
import { Separator } from '@design-system/ui'
import { DELIVERY_COST } from '~/shared'

interface CartSummaryProps {
	totalQuantity: number
	totalPrice: number

	className?: string
}

export function CartSummary({
	totalQuantity,
	totalPrice,
	className
}: CartSummaryProps) {
	return (
		<div className={cn('flex flex-col  gap-4', className)}>
			<h5 className="pc:font-bold pc:text-lg text-sm font-semibold">주문 정보</h5>
			<ul className="grid gap-3">
				<Separator />
				<ListItem label="총 수량" value={`${totalQuantity.toLocaleString()}개`} />
				<ListItem label="총 상품금액" value={`${totalPrice.toLocaleString()}원`} />
				<ListItem label="배송비" value={`${DELIVERY_COST.toLocaleString()}원`} />
				<Separator />
				<ListItem
					label="총 결제금액"
					value={`${(totalPrice + DELIVERY_COST).toLocaleString()}원`}
					className="text-lg font-bold"
				/>
			</ul>
		</div>
	)
}

interface ListItemProps {
	label: string
	value: string
	className?: string
}

function ListItem({ label, value, className }: ListItemProps) {
	return (
		<div className={cn('flex justify-between font-medium', className)}>
			<p>{label}</p>
			<p>{value}</p>
		</div>
	)
}
