'use client'
import { useAction } from '@core/react'
import { useToast } from '@design-system/ui'
import { OrderActionButton } from '#/me/order/ui/order-actions/order-action-button'
import { confirmOrderItemAction } from '#/me/order/action/confirm-order-item'

interface ConfirmOrderButtonProps {
	orderItemId: string
}

export function ConfirmOrderButton({
	orderItemId
}: ConfirmOrderButtonProps): JSX.Element {
	const { toast } = useToast()

	const confirmAction = useAction(confirmOrderItemAction, {
		onSuccess: () => {
			toast({
				title: '구매 확정이 완료되었습니다.',
				description: '이제 리뷰를 작성할 수 있어요'
			})
		}
	})

	const onClick = () => {
		confirmAction.execute({ orderItemId })
	}

	return <OrderActionButton onClick={onClick} label="구매 확정" />
}
