'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteDeliveryInfoAction = authAction
	.metadata({
		actionName: 'deleteDeliveryInfo'
	})
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ parsedInput, ctx }) => {
		const { userId } = ctx

		await db.deliveryInformation.delete({
			where: {
				id: parsedInput.id,
				userId
			}
		})

		revalidatePath('/me/info')
		revalidatePath('/shop/checkout')
	})
