import { type Prisma } from '@core/models'

export const chatRoomsInclude = {
	messages: {
		orderBy: {
			createdAt: 'desc'
		},
		select: {
			createdAt: true,
			text: true,
			isReceiverRead: true,
			isSenderRead: true
		}
	},
	fleaMarketProduct: {
		select: {
			productImages: {
				select: {
					imageUrl: true,
					isPrimary: true
				}
			}
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

export type ChatListItem = Prisma.FleaMarketChatRoomGetPayload<{
	include: typeof chatRoomsInclude
}>
