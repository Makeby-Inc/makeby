'use client'
import { OrderActionButton } from '#/me/order/ui/order-actions/order-action-button'
import { LOGEN_TRACE_URL } from '~/shared'

interface OpenTraceButtonProps {
	trackingNumber?: string
}

export function OpenTraceButton({
	trackingNumber = '1231231233'
}: OpenTraceButtonProps): JSX.Element {
	function onClick() {
		window.open(`${LOGEN_TRACE_URL}${trackingNumber}`, '_blank')
	}

	return <OrderActionButton label="배송 조회" onClick={onClick} />
}
