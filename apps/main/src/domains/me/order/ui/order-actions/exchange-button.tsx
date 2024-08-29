import { OrderActionButton } from '#/me/order/ui/order-actions/order-action-button'

export function ExchangeButton(): JSX.Element {
	const onClick = () => {
		window.open('https://channel.io', '_blank')
	}

	return <OrderActionButton onClick={onClick} label="교환/반품 문의" />
}
