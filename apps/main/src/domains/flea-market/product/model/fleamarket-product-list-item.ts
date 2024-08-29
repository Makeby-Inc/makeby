import { type Prisma } from '@core/models'

export const fleamarketProductListInclude = {
	productCategory: {
		select: {
			name: true
		}
	},
	productImages: {
		select: {
			id: true,
			imageUrl: true,
			isPrimary: true
		}
	},
	seller: {
		select: {
			name: true
		}
	},
	_count: {
		select: {
			likes: true
		}
	}
} satisfies Prisma.FleaMarketProductInclude

export type FleamarketProductListItem = Prisma.FleaMarketProductGetPayload<{
	include: typeof fleamarketProductListInclude
}>
