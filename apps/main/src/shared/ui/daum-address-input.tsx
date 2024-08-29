'use client'

import { Button, Input } from '@design-system/ui'
import { type Address, useDaumPostcodePopup } from 'react-daum-postcode'

interface DaumAddressInputProps {
	onDaumPostcodeChange: (data: Address) => void
	value?: string
	className?: string
}

export function DaumAddressInput({
	onDaumPostcodeChange,
	value
}: DaumAddressInputProps): JSX.Element {
	const openPostcode = useDaumPostcodePopup()

	const handleCompletePostcode = (data: Address) => {
		onDaumPostcodeChange(data)

		return true
	}

	async function handleClick() {
		await openPostcode({
			onComplete: handleCompletePostcode,
			onError: (e) => {
				console.error(e)
			},
			width: 500,
			height: 600,
			autoClose: true
		})
	}

	return (
		<div className="flex w-full justify-center gap-2" onClick={handleClick}>
			<Input
				name="postalCode"
				placeholder="우편번호"
				readOnly
				className="flex-1"
				value={value}
			/>
			<Button type="button" size="sm" variant="outline">
				우편번호 검색
			</Button>
		</div>
	)
}
