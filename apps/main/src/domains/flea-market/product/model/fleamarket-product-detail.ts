import { type Prisma } from '@core/models'

export const fleamarketProductDetailInclude = {
	seller: {
		select: {
			id: true,
			name: true,
			image: true,
			fleaMarketProducts: {
				select: {
					status: true,
					review: {
						select: {
							score: true
						}
					}
				}
			}
		}
	},
	productCategory: {
		select: {
			name: true
		}
	},
	_count: {
		select: {
			likes: true
		}
	},
	productImages: {
		select: {
			imageUrl: true,
			isPrimary: true
		}
	},
	tags: {
		select: {
			name: true
		}
	},
	review: true
} satisfies Prisma.FleaMarketProductInclude

export type FleamarketProductDetail = Prisma.FleaMarketProductGetPayload<{
	include: typeof fleamarketProductDetailInclude
}>
