'use client'

import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'
import { useEffect } from 'react'

interface NumberInputProps {
	value: number
	onChange: (value: number) => void
	min?: number
	max?: number
	step?: number
	disabled?: boolean
}
/**
 * 사용자가 숫자 값을 입력할 수 있는 UI 요소입니다. 버튼을 사용하여 값을 증가 또는 감소시킬 수 있습니다.
 * - `value`: 현재 값
 * - `onChange`: 값 변경 시 호출되는 함수
 * - `min`: 최소 값
 * - `max`: 최대 값
 * - `step`: 증감 값
 * - `disabled`: 비활성화 여부
 */
function NumberInput({ min = 1, step = 1, ...props }: NumberInputProps) {
	const { value, onChange, max, disabled } = props

	useEffect(() => {
		if (value < min) {
			onChange(min)
		}
		if (max && value > max) {
			onChange(max)
		}
		return
	}, [])

	return (
		<div className="gap-md flex items-center">
			<Button
				options="icon"
				size="sm"
				variant="outline"
				onClick={() => onChange(value - step)}
				disabled={disabled || value <= min}
			>
				<Icon name="MinusIcon" className="h-4 w-4" />
			</Button>
			<div className="text-foreground font-bold">{value}</div>
			<Button
				options="icon"
				size="sm"
				variant="outline"
				onClick={() => onChange(value + step)}
				disabled={disabled || (max !== undefined && value >= max)}
			>
				<Icon name="PlusIcon" className="h-4 w-4" />
			</Button>
		</div>
	)
}
NumberInput.displayName = 'NumberInput'

export { NumberInput }
