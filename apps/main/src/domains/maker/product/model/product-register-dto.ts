import * as z from 'zod'

export const optionDto = z.object({
	id: z.string(),
	thumbnailUrl: z.string().min(1),
	title: z.string().trim().min(1),
	description: z.string().trim().min(1),
	price: z.number().min(0).or(z.undefined()),
	stock: z.number().min(0).or(z.undefined())
})
export type OptionData = z.infer<typeof optionDto>

export const productRegisterDto = z.object({
	thumbnailUrl: z.string().min(1, { message: '썸네일을 등록해주세요' }),
	title: z.string().trim().min(1, { message: '제목을 입력해주세요' }),
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
	productImages: z
		.array(z.string())
		.max(10, { message: '최대 10장까지 등록 가능합니다' }),
	description: z
		.string()
		.trim()
		.min(1, { message: '상세 설명을 입력해주세요' })
		.max(1000, {
			message: '최대 1000자까지 입력 가능합니다'
		}),
	options: z.array(optionDto).superRefine((options, ctx) => {
		if (
			options.some(
				(option) =>
					!option.thumbnailUrl ||
					!option.title ||
					!option.description ||
					!option.price ||
					!option.stock
			)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: '옵션 정보를 모두 입력해주세요'
			})
		}
	}),
	tags: z.array(z.string())
})
export type ProductRegisterDto = z.infer<typeof productRegisterDto>

export const productFormDefaultValue = {
	thumbnailUrl: '',
	title: '',
	categoryId: '',
	productImages: [],
	description: '',
	options: [
		{
			id: 'initial',
			thumbnailUrl: '',
			title: '',
			description: '',
			price: undefined,
			stock: undefined
		}
	],
	tags: []
}
