import { type Prisma } from '@core/models'

export const getRoomDefaultFilter = (
	userId: string
): Prisma.FleaMarketChatRoomWhereInput => {
	return {
		OR: [
			// 발신자인 경우
			{
				AND: [{ senderUserId: userId }, { deletedBySender: false }]
			},
			// 수신자인 경우
			{
				AND: [
					{ receiverUserId: userId },
					{ deletedByReceiver: false },
					{
						messages: {
							some: {}
						}
					}
				]
			}
		]
	}
}
