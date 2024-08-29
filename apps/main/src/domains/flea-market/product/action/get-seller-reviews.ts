'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import {
	type SellerReviewDto,
	sellerReviewDto,
	fleamarketReviewInclude
} from '#/flea-market/product/model'
import { DEFAULT_REVIEW_PAGE_SIZE } from '~/shared'

export const getSellerReviewsAction = action
	.metadata({ actionName: 'getSellerReviewsAction' })
	.schema(sellerReviewDto)
	.action(async ({ parsedInput: { sellerId, page } }) => {
		const reviews = await getSellerReviews({
			sellerId,
			page
		})
		return reviews
	})

async function getSellerReviews({ sellerId, page }: SellerReviewDto) {
	const fallPage = page || 1
	const take = DEFAULT_REVIEW_PAGE_SIZE
	const skip = DEFAULT_REVIEW_PAGE_SIZE * (fallPage - 1)

	const reviews = await db.fleaMarketProductReview.findMany({
		where: {
			fleaMarketProduct: {
				sellerUserId: sellerId
			}
		},
		include: fleamarketReviewInclude,
		skip,
		take
	})

	return reviews
}
