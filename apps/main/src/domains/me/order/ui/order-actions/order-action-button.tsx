'use client'

import { Button } from '@design-system/ui'

interface OrderActionButtonProps {
	onClick?: () => void
	label: string
}

export function OrderActionButton({
	onClick,
	label
}: OrderActionButtonProps): JSX.Element {
	return (
		<Button onClick={onClick} variant="outline" size="sm">
			{label}
		</Button>
	)
}
