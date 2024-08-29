'use client'

import { Badge, type ControllerRenderProps } from '@design-system/ui'
import { forwardRef } from 'react'
import { tradeTypeMap } from '~/shared'

interface TradeTypeSectionProps {
	tradeType: string
}
export const TradeTypeSection = forwardRef<
	HTMLButtonElement,
	Pick<
		ControllerRenderProps<TradeTypeSectionProps, 'tradeType'>,
		'value' | 'onChange'
	>
>(({ value, onChange }, ref) => {
	const tradeOptions = Object.entries(tradeTypeMap).map(([key, label]) => ({
		label,
		value: key
	}))

	return (
		<div className="flex items-center gap-2">
			{tradeOptions.map((option) => (
				<button
					type="button"
					key={option.value}
					ref={ref}
					onClick={() => {
						onChange(option.value)
					}}
				>
					<Badge
						variant={value === option.value ? 'default' : 'outline'}
						className="h-9 px-3 py-2"
					>
						{option.label}
					</Badge>
				</button>
			))}
		</div>
	)
})
TradeTypeSection.displayName = 'TradeTypeSection'
