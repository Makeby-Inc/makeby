import { z } from 'zod'

export const createDeliveryInfoDto = z.object({
	addressLabel: z.string({
		message: '배송지 이름을 입력해주세요.'
	}),
	addressee: z.string({
		message: '받는 분을 입력해주세요.'
	}),
	phoneNumber: z
		.string({
			message: '전화번호를 입력해주세요.'
		})
		.regex(/^010-\d{3,4}-\d{4}$/, {
			message: '올바른 전화번호를 입력해주세요.'
		}),
	postalCode: z.string({
		message: '우편번호를 입력해주세요.'
	}),
	address: z.string({
		message: '주소를 입력해주세요.'
	}),
	detailAddress: z.string({
		message: '상세주소를 입력해주세요.'
	}),
	isPrimary: z.boolean()
})

export type CreateDeliveryInfoDto = z.infer<typeof createDeliveryInfoDto>
