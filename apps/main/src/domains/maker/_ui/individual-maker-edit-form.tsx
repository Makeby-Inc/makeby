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
import { SocialInformationSection } from '#/maker/_ui/_maker-register-form/social-information-section'
import { FileUploadSection } from '#/maker/_ui/_maker-register-form/file-upload-section'
import {
	type MakerDetail,
	individualMakerEditDto,
	type IndividualMakerEditDto
} from '#/maker/_model'
import { editIndividualMakerAction } from '#/maker/_action'
import { PhoneNumberSection, VerificationCodeSection } from '#/auth'
import { ResidentRegistrationNumberInput } from '~/shared/ui'
import { SITE_DOMAIN } from '~/shared/lib'

export function IndividualMakerEditForm({
	profileUrl,
	maker
}: {
	profileUrl: string
	maker: MakerDetail
}) {
	const {
		businessName,
		name,
		residentRegistrationNumber,
		phoneNumber,
		email,
		slug,
		socialIds,
		files
	} = maker

	const individualMakerEditForm = useForm<
		z.infer<typeof individualMakerEditDto>
	>({
		resolver: zodResolver(individualMakerEditDto),
		defaultValues: {
			profileUrl,
			businessName,
			name,
			residentRegistrationNumber: residentRegistrationNumber || '',
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
		} satisfies IndividualMakerEditDto
	})

	const disabledBeforeVerification =
		maker.phoneNumber !== individualMakerEditForm.watch('phoneNumber') &&
		!individualMakerEditForm.watch('isVerified')

	const editIndividualMaker = useAction(editIndividualMakerAction, {
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

	const onSubmit = (data: z.infer<typeof individualMakerEditDto>) => {
		if (disabledBeforeVerification) {
			toast({
				title: '휴대전화 번호 인증을 완료해주세요',
				description:
					'휴대전화 번호가 변경되었습니다. 인증 완료 후 다시 시도해주세요.',
				variant: 'destructive'
			})
			return
		}
		editIndividualMaker.execute(data)
	}

	useEffect(() => {
		individualMakerEditForm.setValue('profileUrl', profileUrl)
	}, [profileUrl])

	return (
		<Form {...individualMakerEditForm}>
			<form
				onSubmit={individualMakerEditForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="businessName"
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상호명">
							<Input placeholder="홍길동의굿즈샵" maxLength={30} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="name"
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="이름">
							<Input placeholder="홍길동" maxLength={10} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="residentRegistrationNumber"
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="주민등록번호">
							<ResidentRegistrationNumberInput {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="grid gap-2">
					<FormField
						name="phoneNumber"
						control={individualMakerEditForm.control}
						render={({ field }) => (
							<FormFieldItem title="휴대전화 번호">
								<PhoneNumberSection {...field} />
							</FormFieldItem>
						)}
					/>
					<FormField
						name="isVerified"
						control={individualMakerEditForm.control}
						render={({ field }) => (
							<FormFieldItem>
								<VerificationCodeSection
									phoneNumber={individualMakerEditForm.watch('phoneNumber')}
									{...field}
								/>
							</FormFieldItem>
						)}
					/>
				</div>
				<FormField
					name="email"
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="이메일">
							<Input placeholder="makeby@email.com" maxLength={320} {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="slug"
					control={individualMakerEditForm.control}
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
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="운영중인 SNS">
							<SocialInformationSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="portfolioFileUrls"
					control={individualMakerEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="포트폴리오 첨부">
							<FileUploadSection title="판매 관련 증빙 자료" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="referenceFileUrls"
					control={individualMakerEditForm.control}
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
						disabled={individualMakerEditForm.formState.isSubmitting}
					>
						수정완료
					</Button>
				</div>
			</form>
		</Form>
	)
}
