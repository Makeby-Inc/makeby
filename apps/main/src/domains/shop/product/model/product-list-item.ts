import { type Prisma } from '@core/models'

export const productListInclude = {
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

export type ProductListItem = Prisma.ProductGetPayload<{
	include: typeof productListInclude
}>
