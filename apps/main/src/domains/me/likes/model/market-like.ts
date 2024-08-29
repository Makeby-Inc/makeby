import { type Prisma } from '@core/models'

export const marketLikeInclude = {
	productCategory: {
		select: {
			name: true
		}
	},
	maker: {
		select: {
			slug: true,
			name: true,
			businessName: true
		}
	},
	_count: {
		select: {
			reviews: true,
			likes: true
		}
	}
} satisfies Prisma.ProductInclude

export type MarketLikeItems = Prisma.ProductGetPayload<{
	include: typeof marketLikeInclude
}>
