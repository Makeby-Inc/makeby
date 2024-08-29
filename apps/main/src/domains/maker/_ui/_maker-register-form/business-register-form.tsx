'use client'

import { type MakerType } from '@core/models'
import { useAction } from '@core/react'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type z } from 'zod'
import { SocialInformationSection } from '#/maker/_ui/_maker-register-form/social-information-section'
import { FileUploadSection } from '#/maker/_ui/_maker-register-form/file-upload-section'
import { BusinessLicenseUploadSection } from '#/maker/_ui/_maker-register-form/business-license-upload-section'
import {
	businessMakerRegisterDto,
	businessRegisterFormDefaultValues
} from '#/maker/_model'
import { registerBusinessMakerAction } from '#/maker/_action'
import { PhoneNumberSection, VerificationCodeSection } from '#/auth'
import {
	BusinessNumberInput,
	OptionSelect,
	TermsOfServiceAgreeSection,
	type TermsType
} from '~/shared/ui'
import { SITE_DOMAIN, planTypeMap } from '~/shared/lib'

export function BusinessRegisterForm({
	profileUrl,
	makerBusinessType
}: {
	profileUrl: string
	makerBusinessType: MakerType | undefined
}) {
	const router = useRouter()
	const [agreedTerms, setAgreedTerms] = useState<TermsType[]>([])
	const requiredTerms: TermsType[] = ['AGE', 'TERMS', 'PRIVACY']
	const isRequiredTermsChecked = requiredTerms.every((term) =>
		agreedTerms.includes(term)
	)

	const businessRegisterForm = useForm<z.infer<typeof businessMakerRegisterDto>>(
		{
			resolver: zodResolver(businessMakerRegisterDto),
			defaultValues: businessRegisterFormDefaultValues
		}
	)

	const planOptions = Object.entries(planTypeMap).map(([key, value]) => ({
		label: value,
		value: key
	}))

	const registerBusinessMaker = useAction(registerBusinessMakerAction, {
		onSuccess: () => {
			router.replace('/maker/register/complete')
		},
		onError: () => {
			toast({
				title: '메이커 신청 중 오류가 발생했습니다',
				description:
					'새로 고침 후 다시 시도해주세요. 문제가 지속되면 고객센터에 문의해주세요.',
				variant: 'destructive'
			})
		}
	})

	const onSubmit = (data: z.infer<typeof businessMakerRegisterDto>) => {
		registerBusinessMaker.execute(data)
	}

	useEffect(() => {
		businessRegisterForm.setValue('profileUrl', profileUrl)
		businessRegisterForm.setValue('makerType', makerBusinessType)
		// eslint-disable-next-line react-hooks/exhaustive-deps -- businessRegisterForm is not a dependency
	}, [profileUrl, makerBusinessType])

	return (
		<Form {...businessRegisterForm}>
			<form
				onSubmit={businessRegisterForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="plan"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="요금제">
							<OptionSelect options={planOptions} placeholder="베이직" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="businessName"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="상호명">
							<Input placeholder="홍길동의굿즈샵" maxLength={30} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="name"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="대표자 이름">
							<Input placeholder="홍길동" maxLength={10} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="businessLicenseFileUrl"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="사업자등록증">
							<BusinessLicenseUploadSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="businessNumber"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="사업자등록번호">
							<BusinessNumberInput {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="grid gap-2">
					<FormField
						name="phoneNumber"
						control={businessRegisterForm.control}
						render={({ field }) => (
							<FormFieldItem title="휴대전화 번호">
								<PhoneNumberSection {...field} />
							</FormFieldItem>
						)}
					/>
					<FormField
						name="isVerified"
						control={businessRegisterForm.control}
						render={({ field }) => (
							<FormFieldItem>
								<VerificationCodeSection
									phoneNumber={businessRegisterForm.watch('phoneNumber')}
									{...field}
								/>
							</FormFieldItem>
						)}
					/>
				</div>
				<FormField
					name="email"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="이메일">
							<Input placeholder="makeby@email.com" maxLength={320} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="slug"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="도메인 이름">
							<Input
								placeholder={`${SITE_DOMAIN}/내 도메인이름 (영문 15자 이내)`}
								maxLength={15}
								{...field}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					name="socialIds"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="운영중인 SNS">
							<SocialInformationSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="portfolioFileUrls"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem
							title="포트폴리오 첨부"
							description="첨부 가능한 파일 : 이미지, PDF"
						>
							<FileUploadSection title="판매 관련 증빙 자료" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="referenceFileUrls"
					control={businessRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem
							title="추가 참고 자료"
							description="첨부 가능한 파일 : 이미지, PDF"
						>
							<FileUploadSection title="참고 자료" {...field} />
						</FormFieldItem>
					)}
				/>
				<TermsOfServiceAgreeSection
					agreedTerms={agreedTerms}
					onAgreeChange={(v) => {
						setAgreedTerms(v)
					}}
				/>
				<div className="pc:mt-7 flex items-center gap-2">
					<Button type="button" variant="outline" asChild>
						<Link href="/">취소</Link>
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={
							businessRegisterForm.formState.isSubmitting ||
							!isRequiredTermsChecked ||
							!makerBusinessType
						}
					>
						신청하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
