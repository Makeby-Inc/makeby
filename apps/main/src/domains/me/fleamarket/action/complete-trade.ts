'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { solapiService } from '@providers/solapi'
import { completeTradeDto } from '../model/complete-trade-dto'

export const completeTradeAction = authAction
	.metadata({
		actionName: 'completeTrade'
	})
	.schema(completeTradeDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { productId, buyerId, buyerName, productTitle } = parsedInput

		const [me, buyer] = await Promise.all([
			db.user.findUniqueOrThrow({
				where: {
					id: userId
				}
			}),
			db.user.findUniqueOrThrow({
				where: {
					id: buyerId
				}
			})
		])

		await Promise.all([
			await db.fleaMarketProduct.update({
				where: {
					id: productId,
					sellerUserId: userId
				},
				data: {
					buyer: {
						connect: {
							id: buyerId
						}
					},
					status: 'SOLD_OUT'
				}
			}),
			await db.notification.create({
				data: {
					notificationType: '중고거래 완료',
					content: `${buyerName}님과 거래하신 ‘${productTitle}’ 거래가 완료되었습니다.`,
					user: {
						connect: {
							id: userId
						}
					}
				}
			}),
			await db.notification.create({
				data: {
					notificationType: '중고거래 완료',
					content: `‘${productTitle}’ 거래가 완료되었습니다.`,
					user: {
						connect: {
							id: buyerId
						}
					}
				}
			})
		])

		// TODO: 알림톡 연결
		revalidatePath('/me/fleamarket/products')
		revalidatePath(`/fleamarket/products/${productId}`)
	})
