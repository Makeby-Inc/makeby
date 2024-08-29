import { db } from '@core/models'
import { fleamarketLikeInclude } from '#/me/likes/model'

export async function getFleamarketLikesAction(userId: string) {
	const likedProductIds = await db.fleaMarketProductLike.findMany({
		where: {
			userId
		},
		select: {
			fleaMarketProductId: true
		}
	})

	const fleamarketProducts = await db.fleaMarketProduct.findMany({
		where: {
			id: {
				in: likedProductIds.map((lp) => lp.fleaMarketProductId)
			}
		},
		include: {
			...fleamarketLikeInclude
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	return fleamarketProducts
}
