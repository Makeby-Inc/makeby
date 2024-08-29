import { type Prisma } from '@core/models'

export const fleamarketProductReviewInclude = {
	user: {
		select: {
			name: true,
			image: true
		}
	},
	fleaMarketProduct: {
		select: {
			title: true
		}
	}
} satisfies Prisma.FleaMarketProductReviewInclude

export type FleamarketProductReviewDetail =
	Prisma.FleaMarketProductReviewGetPayload<{
		include: typeof fleamarketProductReviewInclude
	}>
