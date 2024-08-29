import { type ControllerRenderProps, Input } from '@design-system/ui'
import { forwardRef } from 'react'

export const BusinessNumberInput = forwardRef<
	HTMLInputElement,
	ControllerRenderProps
>((field, ref) => {
	return (
		<Input
			type="tel"
			placeholder="123-45-67890"
			maxLength={12}
			pattern="\d{3}-\d{2}-\d{5}"
			{...field}
			ref={ref}
			onChange={(e) => {
				let autoDashedValue = e.target.value.replace(/[^\d]/g, '')
				if (autoDashedValue.length > 5) {
					autoDashedValue = `${autoDashedValue.slice(0, 3)}-${autoDashedValue.slice(
						3,
						5
					)}-${autoDashedValue.slice(5)}`
				} else if (autoDashedValue.length > 3) {
					autoDashedValue = `${autoDashedValue.slice(0, 3)}-${autoDashedValue.slice(
						3
					)}`
				}
				field.onChange(autoDashedValue)
			}}
		/>
	)
})
BusinessNumberInput.displayName = 'BusinessNumberInput'
