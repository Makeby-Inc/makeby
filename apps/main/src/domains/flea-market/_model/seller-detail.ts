import { type Prisma } from '@core/models'

export const sellerDetailSelect = {
	name: true,
	image: true,
	fleaMarketProducts: {
		include: {
			review: true
		}
	},
	fleaMarketProductReviews: true
} satisfies Prisma.UserSelect

export type SellerDetail = Prisma.UserGetPayload<{
	select: typeof sellerDetailSelect
}>
