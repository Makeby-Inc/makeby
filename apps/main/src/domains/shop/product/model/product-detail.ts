import { type Prisma } from '@core/models'

export const productDetailInclude = {
	options: {
		select: {
			id: true,
			title: true,
			description: true,
			stock: true,
			price: true,
			thumbnailUrl: true
		}
	},
	maker: {
		select: {
			userId: true,
			slug: true,
			name: true,
			businessName: true,
			profileUrl: true,
			socialIds: {
				select: {
					socialId: true,
					type: true
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
	reviews: {
		select: {
			id: true,
			createdAt: true,
			content: true,
			reviewImages: true,
			user: {
				select: {
					name: true,
					image: true
				}
			},
			orderItem: {
				select: {
					option: {
						select: {
							title: true,
							description: true
						}
					}
				}
			}
		}
	}
} satisfies Prisma.ProductInclude

export type ProductDetail = Prisma.ProductGetPayload<{
	include: typeof productDetailInclude
}>
