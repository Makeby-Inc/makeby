import * as z from 'zod'
import { type SocialNetworkType } from '@core/models'
import {
	englishRegex,
	fileDto,
	phoneNumberRegex,
	residentRegistrationNumberRegex,
	socialDto
} from '~/shared'

export const individualMakerRegisterDto = z.object({
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
	residentRegistrationNumber: z
		.string()
		.trim()
		.min(14, { message: '주민등록번호를 입력해주세요' })
		.regex(residentRegistrationNumberRegex, {
			message: '올바른 주민등록번호 형식을 입력해주세요'
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

export type IndividualMakerRegisterDto = z.infer<
	typeof individualMakerRegisterDto
>

export const individualRegisterFormDefaultValues = {
	profileUrl: '',
	businessName: '',
	name: '',
	residentRegistrationNumber: '',
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
} satisfies IndividualMakerRegisterDto
