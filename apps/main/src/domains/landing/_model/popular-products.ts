import { type Prisma } from '@core/models'

export const popularProductInclude = {
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

export type PopularProduct = Prisma.ProductGetPayload<{
	include: typeof popularProductInclude
}>
