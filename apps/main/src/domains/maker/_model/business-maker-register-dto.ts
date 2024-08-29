import { type SocialNetworkType } from '@core/models'
import * as z from 'zod'
import {
	businessNumberRegex,
	englishRegex,
	fileDto,
	phoneNumberRegex,
	socialDto
} from '~/shared'

export const businessMakerRegisterDto = z.object({
	profileUrl: z.string(),
	makerType: z.string().or(z.undefined()),
	plan: z
		.string()
		.or(z.undefined())
		.superRefine((plan, ctx) => {
			if (!plan) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: '요금제를 선택해주세요'
				})
			}
		}),
	businessName: z
		.string()
		.trim()
		.min(1, { message: '상호명을 입력해주세요' })
		.max(30, { message: '닉네임은 최대 30자까지 가능합니다' }),
	name: z
		.string()
		.trim()
		.min(1, { message: '대표자 이름을 입력해주세요' })
		.max(10, { message: '이름은 최대 10자까지 가능합니다' }),
	businessLicenseFileUrl: fileDto.superRefine((businessLicenseFileUrl, ctx) => {
		if (!businessLicenseFileUrl.fileUrl) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['businessLicenseFile'],
				message: '사업자 등록증을 등록해주세요'
			})
		}
	}),
	businessNumber: z
		.string()
		.trim()
		.min(10, { message: '사업자등록번호를 입력해주세요' })
		.regex(businessNumberRegex, {
			message: '올바른 사업자등록번호를 입력해주세요'
		}),
	phoneNumber: z
		.string()
		.min(12, { message: '전화번호를 입력해주세요' })
		.regex(phoneNumberRegex, { message: '올바른 전화번호를 입력해주세요' }),
	isVerified: z.boolean(),
	email: z
		.string()
		.trim()
		.min(1, { message: '메시지를 입력해주세요' })
		.email({ message: '올바른 이메일을 입력해주세요' }),
	slug: z
		.string()
		.trim()
		.min(1, { message: '도메인 이름을 입력해주세요' })
		.regex(englishRegex, { message: '영문으로 입력해주세요' })
		.max(15, { message: '영문 최대 15자까지 가능합니다' }),
	socialIds: z.array(socialDto).superRefine((socialIds, ctx) => {
		if (socialIds.some((social) => !social.socialId.trim())) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'SNS 아이디를 입력해주세요'
			})
		}
	}),
	portfolioFileUrls: z.array(fileDto).superRefine((portfolioFileUrls, ctx) => {
		if (portfolioFileUrls.some((file) => !file.fileUrl)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: '포트폴리오 파일을 등록해주세요'
			})
		}
	}),
	referenceFileUrls: z.array(fileDto)
})

export type BusinessMakerRegisterDto = z.infer<typeof businessMakerRegisterDto>

export const businessRegisterFormDefaultValues = {
	profileUrl: '',
	businessName: '',
	name: '',
	businessLicenseFileUrl: {
		id: 'unique',
		fileName: '',
		fileUrl: ''
	},
	businessNumber: '',
	phoneNumber: '',
	isVerified: false,
	email: '',
	slug: '',
	socialIds: [
		{
			id: 'primary',
			socialType: 'X' as SocialNetworkType,
			socialId: ''
		}
	],
	portfolioFileUrls: [
		{
			id: 'primary',
			fileName: '',
			fileUrl: ''
		}
	],
	referenceFileUrls: [
		{
			id: 'primary',
			fileName: '',
			fileUrl: ''
		}
	]
} satisfies BusinessMakerRegisterDto
