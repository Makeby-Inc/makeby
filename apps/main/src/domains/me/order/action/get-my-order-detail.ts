'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'
import { myOrderInclude } from '#/me/order/model/my-order-include'

export const getMyOrderDetailAction = authAction
	.metadata({
		actionName: 'getMyOrderDetail'
	})
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ ctx, parsedInput }) => {
		const { id } = parsedInput
		const { userId } = ctx

		return await db.productOrder.findFirstOrThrow({
			where: {
				id,
				userId
			},
			include: myOrderInclude
		})
	})
