'use client'

import { Textarea, type ControllerRenderProps } from '@design-system/ui'
import { forwardRef } from 'react'

interface TextareaInputProps {
	description: string
}

export const TextareaInput = forwardRef<
	HTMLTextAreaElement,
	Pick<
		ControllerRenderProps<TextareaInputProps, 'description'>,
		'value' | 'onChange'
	> & {
		placeholder?: string
		minLength?: number
		maxLength?: number
	}
>(({ placeholder, minLength, maxLength = 1000, value, onChange }, ref) => {
	return (
		<div className="flex flex-col items-end gap-[5px]">
			<Textarea
				ref={ref}
				value={value}
				placeholder={placeholder}
				minLength={minLength}
				maxLength={maxLength}
				onChange={(e) => {
					onChange(e.target.value)
				}}
			/>
			<span className="text-secondary-foreground text-sm font-light">
				{value.length}/{maxLength}
			</span>
		</div>
	)
})
TextareaInput.displayName = 'TextareaInput'
