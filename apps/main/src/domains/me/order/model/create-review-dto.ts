import { z } from 'zod'

export const createReviewDto = z.object({
	orderItemId: z.string(),
	productImages: z.array(z.string()),
	content: z
		.string({
			message: '리뷰 내용을 입력해주세요'
		})
		.min(10, {
			message: '리뷰 내용은 10자 이상 입력해주세요'
		})
		.max(500, {
			message: '리뷰 내용은 500자 이하로 입력해주세요'
		})
})

export type CreateReviewDto = z.infer<typeof createReviewDto>
