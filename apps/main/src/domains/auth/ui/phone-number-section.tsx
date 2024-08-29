'use client'

import { useAction } from '@core/react'
import {
	Button,
	Input,
	toast,
	type ControllerRenderProps
} from '@design-system/ui'
import { forwardRef, useState } from 'react'
import { sendVerificationCodeAction } from '#/auth/action'
import { phoneNumberRegex } from '~/shared/lib'
import { addPhoneNumberHyphen } from '~/shared'

interface PhoneNumberSectionProps {
	phoneNumber: string
	onRequest: () => void
}

export const PhoneNumberSection = forwardRef<
	HTMLInputElement,
	Pick<
		ControllerRenderProps<PhoneNumberSectionProps, 'phoneNumber'>,
		'value' | 'onChange'
	> & { onRequest?: () => void }
>(({ value, onChange, onRequest }, ref) => {
	const [requested, setRequested] = useState(false)

	const sendVerificationCode = useAction(sendVerificationCodeAction, {
		onSuccess: () => {
			toast({
				title: '인증번호가 발송되었습니다'
			})
			onRequest?.()
		},
		onError: () => {
			toast({
				description: '인증번호 발송에 실패했습니다',
				variant: 'destructive'
			})
		}
	})

	const handleRequestVerification = () => {
		if (!value.trim() || !phoneNumberRegex.test(value)) {
			toast({
				description: '올바른 전화번호를 입력해주세요',
				variant: 'destructive'
			})
			return
		}
		setRequested(true)
		sendVerificationCode.execute({
			phoneNumber: value
		})
	}

	return (
		<div className="flex items-center gap-2">
			<Input
				type="tel"
				ref={ref}
				value={value}
				maxLength={13}
				placeholder="`-` 제외하고 입력해 주세요"
				pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
				onChange={(e) => {
					const autoDashedValue = addPhoneNumberHyphen(e.target.value)
					onChange(autoDashedValue)
				}}
				disabled={requested}
			/>

			<Button
				type="button"
				variant="outline"
				className="text-secondary-foreground shrink-0"
				onClick={handleRequestVerification}
			>
				인증번호 요청
			</Button>
		</div>
	)
})
PhoneNumberSection.displayName = 'PhoneNumberSection'
