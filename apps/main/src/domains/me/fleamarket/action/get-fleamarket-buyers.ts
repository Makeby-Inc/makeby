'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'

export const getFleamarketBuyersAction = authAction
	.metadata({
		actionName: 'getFleamarketBuyersAction'
	})
	.schema(
		z.object({
			productId: z.string()
		})
	)
	.action(async ({ parsedInput: { productId }, ctx: { userId } }) => {
		const { chatRooms } = await db.fleaMarketProduct.findUniqueOrThrow({
			where: {
				id: productId
			},
			include: {
				chatRooms: {
					include: {
						senderUser: {
							select: {
								id: true,
								image: true,
								name: true
							}
						}
					}
				}
			}
		})

		const buyers = chatRooms
			.filter((chatRoom) => chatRoom.senderUser.id !== userId)
			.map((chatRoom) => chatRoom.senderUser)

		return buyers
	})
