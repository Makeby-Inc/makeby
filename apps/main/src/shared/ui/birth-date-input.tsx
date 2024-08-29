import { type ControllerRenderProps, Input } from '@design-system/ui'
import { forwardRef } from 'react'

export const BirthDateInput = forwardRef<
	HTMLInputElement,
	ControllerRenderProps
>((field, ref) => {
	const value = field.value as string

	return (
		<Input
			type="tel"
			placeholder="생년월일 8자리를 입력해 주세요"
			maxLength={10}
			pattern="\d{4}-\d{2}-\d{2}"
			ref={ref}
			value={value}
			onChange={(e) => {
				let autoDashedValue = e.target.value.replace(/[^\d]/g, '')
				if (autoDashedValue.length > 6) {
					autoDashedValue = `${autoDashedValue.slice(0, 4)}-${autoDashedValue.slice(
						4,
						6
					)}-${autoDashedValue.slice(6)}`
				} else if (autoDashedValue.length > 4) {
					autoDashedValue = `${autoDashedValue.slice(0, 4)}-${autoDashedValue.slice(
						4
					)}`
				}
				field.onChange(autoDashedValue)
			}}
		/>
	)
})
BirthDateInput.displayName = 'BirthDateInput'
