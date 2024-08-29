import { type Prisma } from '@core/models'

export const newProductInclude = {
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

export type NewProduct = Prisma.ProductGetPayload<{
	include: typeof newProductInclude
}>
