'use client'
import { CancelOrderButton } from '#/me/order/ui/order-actions/cancel-order-button'
import { type MyOrderItem } from '#/me/order/model/my-order-item'
import { OpenTraceButton } from '#/me/order/ui/order-actions/open-trace-button'
import { ConfirmOrderButton } from '#/me/order/ui/order-actions/confirm-order-button'
import { ExchangeButton } from '#/me/order/ui/order-actions/exchange-button'
import { CreateReviewButton } from '#/me/order/ui/order-actions/create-review-button'

interface OrderActionsProps {
	item: MyOrderItem
}

export function OrderActions({ item }: OrderActionsProps): JSX.Element {
	switch (item.deliveryStatus) {
		case 'PENDING':
			return <CancelOrderButton item={item} />
		case 'SENT':
			return (
				<>
					<OpenTraceButton trackingNumber={item.trackingNumber} />
					<ConfirmOrderButton orderItemId={item.id} />
					<ExchangeButton />
				</>
			)
		case 'CONFIRMED':
			if (item.productReview) {
				return <></>
			}
			return <CreateReviewButton item={item} />
		default:
			return <></>
	}
}
