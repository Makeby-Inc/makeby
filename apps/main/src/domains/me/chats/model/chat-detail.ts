import { type Prisma } from '@core/models'

export const chatRoomMessageInclude = {
	messages: {
		orderBy: {
			createdAt: 'asc'
		},
		select: {
			createdAt: true,
			text: true,
			images: true,
			senderUserId: true,
			receiverUser: {
				select: {
					id: true,
					image: true
				}
			},
			senderUser: {
				select: {
					id: true,
					image: true
				}
			}
		}
	},
	fleaMarketProduct: {
		select: {
			id: true,
			seller: {
				select: {
					fleaMarketProducts: {
						select: {
							review: true
						}
					}
				}
			},
			productImages: {
				select: {
					imageUrl: true,
					isPrimary: true
				}
			},
			tradeType: true,
			productCategory: {
				select: {
					name: true
				}
			},
			title: true,
			price: true
		}
	},
	senderUser: {
		select: {
			name: true,
			image: true
		}
	},
	receiverUser: {
		select: {
			name: true,
			image: true
		}
	}
} satisfies Prisma.FleaMarketChatRoomInclude

export type ChatRoomDetail = Prisma.FleaMarketChatRoomGetPayload<{
	include: typeof chatRoomMessageInclude
}>
