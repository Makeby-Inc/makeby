import { type Prisma } from '@core/models'

export const fleamarketLikeInclude = {
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

export type FleamarketLikeItems = Prisma.FleaMarketProductGetPayload<{
	include: typeof fleamarketLikeInclude
}>
