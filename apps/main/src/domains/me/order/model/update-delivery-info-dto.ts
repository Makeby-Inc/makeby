import { z } from 'zod'
import { createDeliveryInfoDto } from '#/me/order/model/create-delivery-info-dto'

export const updateDeliveryInfoDto = createDeliveryInfoDto.extend({
	id: z.string()
})

export type UpdateDeliveryInfoDto = z.infer<typeof updateDeliveryInfoDto>
