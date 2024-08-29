'use client'

import { useState } from 'react'
import { useAction } from '@core/react'
import { useToast } from '@design-system/ui'
import { type UserInformationDto } from '#/me/_model'
import { PhoneNumberSection, VerificationCodeSection } from '#/auth'
import { phoneUpdateAction } from '#/me/_action'

export function PhoneNumberArea({ myData }: { myData: UserInformationDto }) {
	const [phoneNumber, setPhoneNumber] = useState(myData.phoneNumber)
	const [isRequested, setIsRequested] = useState(false)
	const [isVerified, setIsVerified] = useState(false)

	const { toast } = useToast()
	const phoneAction = useAction(phoneUpdateAction, {
		onSuccess: () => {
			toast({
				title: '변경 성공 !',
				description: '전화번호가 변경되었습니다.',
				variant: 'success'
			})
		}
	})

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setPhoneNumber(e.target.value)
	}

	function handleRequest() {
		setIsRequested(true)
	}

	function handleVerification(checked: boolean) {
		if (checked) {
			phoneAction.execute({ phoneNumber: phoneNumber ?? '' })
		}

		setIsVerified(checked)
	}

	return (
		<div className="flex flex-col gap-[5px]">
			<div className="text-sm font-semibold">휴대전화번호</div>
			<div className="flex flex-col gap-2">
				<PhoneNumberSection
					value={phoneNumber ?? ''}
					onChange={handleInputChange}
					onRequest={handleRequest}
				/>
				{isRequested ? (
					<VerificationCodeSection
						phoneNumber={phoneNumber ?? ''}
						value={isVerified}
						onChange={handleVerification}
					/>
				) : null}
			</div>
		</div>
	)
}
