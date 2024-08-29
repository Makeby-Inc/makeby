import { type Prisma } from '@core/models'

export const fleamarketReviewInclude = {
	fleaMarketProduct: {
		select: {
			title: true
		}
	},
	user: {
		select: {
			name: true,
			image: true
		}
	}
} satisfies Prisma.FleaMarketProductReviewInclude

export type FleamarketReviewDetail = Prisma.FleaMarketProductReviewGetPayload<{
	include: typeof fleamarketReviewInclude
}>
