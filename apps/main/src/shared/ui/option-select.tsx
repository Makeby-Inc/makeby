import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import React, { forwardRef } from 'react'

interface OptionSelectProps {
	options: { label: string; value: string }[]
	value: string | undefined
	onChange: (value: string) => void
	placeholder?: string
	className?: string
}

export const OptionSelect = forwardRef<HTMLButtonElement, OptionSelectProps>(
	({ options, value, onChange, placeholder, className }, ref) => {
		return (
			<Select
				defaultValue={value}
				onValueChange={(v) => {
					onChange(v)
				}}
			>
				<SelectTrigger ref={ref} className={className}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)
	}
)
OptionSelect.displayName = 'OptionSelect'
