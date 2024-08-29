import { z } from 'zod'

export const fleaMarketUpdateDto = z
	.object({
		productId: z.string(),
		productImages: z
			.array(z.string())
			.min(1, { message: '최소 한 장의 상품 이미지를 등록해 주세요' })
			.max(10, { message: '최대 10장까지 등록 가능합니다' }),
		title: z.string().trim().min(1, { message: '제목을 입력해주세요' }),
		tradeType: z.string(),
		price: z.number().min(0).or(z.null()),
		categoryId: z
			.string()
			.or(z.undefined())
			.superRefine((categoryId, ctx) => {
				if (!categoryId) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: '카테고리를 선택해주세요'
					})
				}
			}),
		description: z
			.string()
			.trim()
			.min(1, { message: '상세 설명을 입력해주세요' })
			.max(1000, {
				message: '최대 1000자까지 입력 가능합니다'
			}),
		tags: z.array(z.string())
	})
	.superRefine(({ tradeType, price }, ctx) => {
		if ((tradeType === 'SELL' || tradeType === 'PURCHASE') && !price) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['price'],
				message: '가격을 입력해주세요'
			})
		}
	})
export type FleaMarketUpdateDto = z.infer<typeof fleaMarketUpdateDto>
