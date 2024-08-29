import { db } from '@core/models'
import { marketLikeInclude } from '#/me/likes/model'

export async function getMarketLikesAction(userId: string) {
	const likedProductIds = await db.productLike.findMany({
		where: {
			userId
		},
		select: {
			productId: true
		}
	})

	const MarketProducts = await db.product.findMany({
		where: {
			id: {
				in: likedProductIds.map((lp) => lp.productId)
			},
			status: 'RELEASED'
		},
		include: {
			...marketLikeInclude
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	return MarketProducts
}
