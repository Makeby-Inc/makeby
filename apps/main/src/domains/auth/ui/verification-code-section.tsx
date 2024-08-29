'use client'

import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import {
	Button,
	type ControllerRenderProps,
	Input,
	toast
} from '@design-system/ui'
import { forwardRef, useState } from 'react'
import { verifyPhoneNumberAction } from '#/auth/action'

interface VerificationCodeSectionProps {
	isVerified: boolean
}

export const VerificationCodeSection = forwardRef<
	HTMLInputElement,
	Pick<
		ControllerRenderProps<VerificationCodeSectionProps, 'isVerified'>,
		'value' | 'onChange'
	> & {
		phoneNumber: string
	}
>(({ phoneNumber, value, onChange }, ref) => {
	const [code, setCode] = useState('')

	const { execute } = useAction(verifyPhoneNumberAction, {
		onSuccess: ({ data }) => {
			if (data) {
				onChange(true)
				toast({
					title: '인증이 완료되었습니다.',
					variant: 'success'
				})
			} else {
				toast({
					title: '인증번호가 올바르지 않습니다.',
					description: '인증번호를 다시 확인해 주세요.',
					variant: 'destructive'
				})
			}
		}
	})

	const handleCheckVerification = () => {
		if (!code.trim() || code.length < 5) return

		execute({
			phoneNumber,
			code
		})
	}

	return (
		<div className="grid gap-2">
			<div className="flex items-center gap-2">
				<Input
					ref={ref}
					value={code}
					maxLength={6}
					placeholder="인증번호를 입력해 주세요"
					onChange={(e) => {
						setCode(e.target.value)
					}}
					disabled={value || !phoneNumber}
				/>
				<Button
					type="button"
					className="shrink-0"
					onClick={handleCheckVerification}
					disabled={!phoneNumber}
				>
					확인
				</Button>
			</div>
			{value ? (
				<div className="text-primary flex items-center gap-1 text-sm">
					<Icon name="CheckCircleIcon" size="sm" solid />
					인증이 완료되었습니다.
				</div>
			) : null}
		</div>
	)
})
VerificationCodeSection.displayName = 'VerificationCodeSection'
