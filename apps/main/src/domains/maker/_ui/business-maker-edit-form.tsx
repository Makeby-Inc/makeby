'use client'

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
import { useEffect } from 'react'
import { type z } from 'zod'
import { PhoneNumberSection, VerificationCodeSection } from '#/auth'
import { editBusinessMakerAction } from '#/maker/_action'
import { BusinessLicenseUploadSection } from '#/maker/_ui/_maker-register-form/business-license-upload-section'
import { FileUploadSection } from '#/maker/_ui/_maker-register-form/file-upload-section'
import { SocialInformationSection } from '#/maker/_ui/_maker-register-form/social-information-section'
import { BusinessNumberInput } from '~/shared/ui'
import {
	type MakerDetail,
	businessMakerEditDto,
	type BusinessMakerEditDto
} from '#/maker/_model'
import { SITE_DOMAIN } from '~/shared/lib'

export function BusinessMakerEditForm({
	profileUrl,
	maker
}: {
	profileUrl: string
	maker: MakerDetail
}) {
	const {
		businessName,
		businessNumber,
		name,
		phoneNumber,
		email,
		slug,
		socialIds,
		files
	} = maker

	const businessMakerEditForm = useForm<z.infer<typeof businessMakerEditDto>>({
		resolver: zodResolver(businessMakerEditDto),
		defaultValues: {
			profileUrl,
			businessName,
			name,
			businessLicenseFileUrl: {
				id: 'unique',
				fileName:
					files.find((file) => file.type === 'BUSINESS_LICENSE')?.fileName || '',
				fileUrl:
					files.find((file) => file.type === 'BUSINESS_LICENSE')?.fileUrl || ''
			},
			businessNumber: businessNumber || '',
			phoneNumber,
			isVerified: false,
			email,
			slug,
			socialIds: [
				...socialIds.map((social) => ({
					id: social.isPrimary ? 'primary' : social.id,
					socialType: social.type,
					socialId: social.socialId
				}))
			],
			portfolioFileUrls: [
				...files
					.filter((file) => file.type === 'PORTFOLIO')
					.map((portfolio) => ({
						id: portfolio.id,
						fileName: portfolio.fileName,
						fileUrl: portfolio.fileUrl
					}))
			],
			referenceFileUrls: [
				...files
					.filter((file) => file.type === 'REFERENCE')
					.map((portfolio) => ({
						id: portfolio.id,
						fileName: portfolio.fileName,
						fileUrl: portfolio.fileUrl
					}))
			]
		} satisfies BusinessMakerEditDto
	})

	const disabledBeforeVerification =
		maker.phoneNumber !== businessMakerEditForm.watch('phoneNumber') &&
		!businessMakerEditForm.watch('isVerified')

	const editBusinessMaker = useAction(editBusinessMakerAction, {
		onSuccess: () => {
			toast({
				title: '정보가 수정되었습니다',
				variant: 'success'
			})
		},
		onError: () => {
			toast({
				title: '정보 수정 중 오류가 발생했습니다',
				description:
					'새로 고침 후 다시 시도해주세요. 문제가 지속되면 고객센터에 문의해주세요.',
				variant: 'destructive'
			})
		}
	})

	const onSubmit = (data: z.infer<typeof businessMakerEditDto>) => {
		if (disabledBeforeVerification) {
			toast({
				title: '휴대전화 번호 인증을 완료해주세요',
				description:
					'휴대전화 번호가 변경되었습니다. 인증 완료 후 다시 시도해주세요.',
				variant: 'destructive'
			})
			return
		}
		editBusinessMaker.execute(data)
	}

	useEffect(() => {
		businessMakerEditForm.setValue('profileUrl', profileUrl)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profileUrl])

	return (
		<Form {...businessMakerEditForm}>
			<form
				onSubmit={businessMakerEditForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="businessName"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상호명">
							<Input placeholder="홍길동의굿즈샵" maxLength={30} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="name"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="대표자 이름">
							<Input placeholder="홍길동" maxLength={10} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="businessLicenseFileUrl"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="사업자등록증">
							<BusinessLicenseUploadSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="businessNumber"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="사업자등록번호">
							<BusinessNumberInput {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="grid gap-2">
					<FormField
						name="phoneNumber"
						control={businessMakerEditForm.control}
						render={({ field }) => (
							<FormFieldItem title="휴대전화 번호">
								<PhoneNumberSection {...field} />
							</FormFieldItem>
						)}
					/>
					<FormField
						name="isVerified"
						control={businessMakerEditForm.control}
						render={({ field }) => (
							<FormFieldItem>
								<VerificationCodeSection
									phoneNumber={businessMakerEditForm.watch('phoneNumber')}
									{...field}
								/>
							</FormFieldItem>
						)}
					/>
				</div>
				<FormField
					name="email"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="이메일">
							<Input placeholder="makeby@email.com" maxLength={320} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="slug"
					control={businessMakerEditForm.control}
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
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="운영중인 SNS">
							<SocialInformationSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="portfolioFileUrls"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="포트폴리오 첨부">
							<FileUploadSection title="판매 관련 증빙 자료" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="referenceFileUrls"
					control={businessMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="추가 참고 자료">
							<FileUploadSection title="참고 자료" {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="pc:mt-7 flex items-center gap-2">
					<Button type="button" variant="outline" asChild>
						<Link href="/maker/dashboard/product">취소</Link>
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={businessMakerEditForm.formState.isSubmitting}
					>
						수정 완료
					</Button>
				</div>
			</form>
		</Form>
	)
}
