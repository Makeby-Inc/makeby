import { z } from 'zod'

export const cancelOrderItemDto = z.object({
	orderItemId: z.string(),
	cancelReasonType: z.enum(
		[
			'CHANGE_OF_MIND',
			'ORDER_MISTAKE',
			'CANCEL_AND_REORDER',
			'SERVICE_COMPLAINT'
		],
		{
			message: '취소 사유를 선택해주세요.'
		}
	),
	reason: z.string().optional()
})

export type CancelOrderItemDto = z.infer<typeof cancelOrderItemDto>
