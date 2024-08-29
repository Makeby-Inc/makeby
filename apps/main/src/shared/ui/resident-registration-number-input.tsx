import { type ControllerRenderProps, Input } from '@design-system/ui'
import { forwardRef } from 'react'

export const ResidentRegistrationNumberInput = forwardRef<
	HTMLInputElement,
	ControllerRenderProps
>((field, ref) => {
	return (
		<Input
			type="tel"
			placeholder="`-`를 제외하고 입력해 주세요"
			maxLength={14}
			pattern="\d{6}-\d{7}"
			{...field}
			ref={ref}
			onChange={(e) => {
				let autoDashedValue = e.target.value.replace(/[^\d]/g, '')
				if (autoDashedValue.length > 6) {
					autoDashedValue = `${autoDashedValue.slice(0, 6)}-${autoDashedValue.slice(
						6
					)}`
				}
				field.onChange(autoDashedValue)
			}}
		/>
	)
})
ResidentRegistrationNumberInput.displayName = 'ResidentRegistrationNumberInput'
