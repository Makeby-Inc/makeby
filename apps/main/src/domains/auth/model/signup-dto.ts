import { z } from 'zod'
import { birthDateRegex, phoneNumberRegex } from '~/shared'

export const signupDto = z
	.object({
		image: z.string(),
		name: z
			.string()
			.trim()
			.min(1, { message: '이름을 입력해주세요' })
			.max(10, { message: '이름은 최대 10자까지 가능합니다' }),
		phoneNumber: z
			.string()
			.min(12, { message: '전화번호를 입력해주세요' })
			.regex(phoneNumberRegex, { message: '올바른 전화번호를 입력해주세요' }),
		isVerified: z.boolean(),
		birthDate: z
			.string()
			.trim()
			.min(10, { message: '생년월일을 입력해주세요' })
			.regex(birthDateRegex, { message: 'YYYY-MM-DD 형식으로 입력해주세요' })
	})
	.superRefine(({ isVerified }, ctx) => {
		if (!isVerified) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['isVerified'],
				message: '인증을 완료해주세요'
			})
		}
	})

export const signupProfileFormDefaultValues = {
	image: '',
	name: '',
	phoneNumber: '',
	isVerified: false,
	birthDate: ''
}

export type SignupDto = z.infer<typeof signupDto>
