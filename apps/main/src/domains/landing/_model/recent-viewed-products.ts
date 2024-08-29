import { type Prisma } from '@core/models'

export const recentProductInclude = {
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

export type RecentViewedProduct = Prisma.ProductGetPayload<{
	include: typeof recentProductInclude
}>
