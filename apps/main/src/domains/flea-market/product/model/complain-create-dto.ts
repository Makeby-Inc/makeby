import { z } from 'zod'

export const complainCreateDto = z.object({
	fleaMarketProductId: z.string(),
	complaintType: z.string().min(1, { message: '신고 유형을 선택해주세요' }),
	content: z.string()
})

export type ComplainCreateDto = z.infer<typeof complainCreateDto>
