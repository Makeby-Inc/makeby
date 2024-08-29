'use client'

import { useAction, useDialogStore } from '@core/react'
import {
	Button,
	Form,
	FormField,
	FormFieldItem,
	Input,
	toast,
	useForm
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import {
	signupProfileFormDefaultValues,
	signupDto,
	type SignupDto
} from '#/auth/model'
import {
	BirthDateInput,
	ProfileImageSection,
	TermsOfServiceAgreeSection,
	type TermsType
} from '~/shared'
import { createUserProfileAction } from '#/auth/action'
import { PhoneNumberSection } from '#/auth/ui/phone-number-section'
import { VerificationCodeSection } from '#/auth/ui/verification-code-section'

export function SignUpForm() {
	const { toggleDialog } = useDialogStore()
	const [agreedTerms, setAgreedTerms] = useState<TermsType[]>([])
	const requiredTerms: TermsType[] = ['AGE', 'TERMS', 'PRIVACY']
	const isRequiredTermsChecked = requiredTerms.every((term) =>
		agreedTerms.includes(term)
	)

	const signupProfileForm = useForm<SignupDto>({
		resolver: zodResolver(signupDto),
		defaultValues: signupProfileFormDefaultValues
	})

	const createUserProfile = useAction(createUserProfileAction, {
		onExecute: () => {
			toggleDialog('isWelcomeDialogOpened')
		},
		onError: () => {
			toast({
				title: '회원가입에 실패했습니다.',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const onSubmit = signupProfileForm.handleSubmit((data: SignupDto) => {
		const isAgreeToMarketingSubscription = agreedTerms.includes('MARKETING')
		const { isVerified: _, ...dto } = data
		createUserProfile.execute({
			...dto,
			isMarketingSubscribed: isAgreeToMarketingSubscription
		})
	})

	return (
		<Form {...signupProfileForm}>
			<form onSubmit={onSubmit} className="pc:gap-8 grid gap-10">
				<FormField
					name="image"
					control={signupProfileForm.control}
					render={({ field }) => (
						<FormFieldItem label={false}>
							<ProfileImageSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="name"
					control={signupProfileForm.control}
					render={({ field }) => (
						<FormFieldItem title="닉네임">
							<Input placeholder="홍길동" maxLength={10} {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="grid gap-2">
					<FormField
						name="phoneNumber"
						control={signupProfileForm.control}
						render={({ field }) => (
							<FormFieldItem title="휴대전화 번호">
								<PhoneNumberSection {...field} />
							</FormFieldItem>
						)}
					/>
					<FormField
						name="isVerified"
						control={signupProfileForm.control}
						render={({ field }) => (
							<FormFieldItem>
								<VerificationCodeSection
									phoneNumber={signupProfileForm.watch('phoneNumber')}
									{...field}
								/>
							</FormFieldItem>
						)}
					/>
				</div>
				<FormField
					name="birthDate"
					control={signupProfileForm.control}
					render={({ field }) => (
						<FormFieldItem title="생년월일">
							<BirthDateInput {...field} />
						</FormFieldItem>
					)}
				/>
				<TermsOfServiceAgreeSection
					agreedTerms={agreedTerms}
					onAgreeChange={(v) => {
						setAgreedTerms(v)
					}}
				/>
				<div className="pc:mt-7 flex">
					<Button
						type="submit"
						className="flex-1"
						disabled={
							signupProfileForm.formState.isSubmitting || !isRequiredTermsChecked
						}
					>
						가입하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
