'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import {
	fleamarketReviewCreateDto,
	type FleamarketReviewCreateDto
} from '#/me/fleamarket/model'

const createFleamarketReviewAction = authAction
	.metadata({ actionName: 'createFleamarketReviewAction' })
	.schema(fleamarketReviewCreateDto)
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const review = await createReview(userId, dto)
		revalidatePath('/me/fleamarket/products')
		return review
	})

export async function createReview(
	userId: string,
	dto: FleamarketReviewCreateDto
) {
	const { reviewerName, sellerId, productTitle, ...data } = dto

	const review = await db.fleaMarketProductReview.create({
		data: {
			userId,
			...data
		}
	})

	// TODO: 알림톡 연결

	await db.notification.create({
		data: {
			notificationType: '중고거래 후기 도착',
			content: `${reviewerName}님과 거래하신 '${productTitle}' 후기가 도착했어요!`,
			user: {
				connect: {
					id: sellerId
				}
			}
		}
	})

	return review
}

export { createFleamarketReviewAction }
