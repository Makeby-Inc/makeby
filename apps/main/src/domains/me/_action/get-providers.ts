import { db } from '@core/models'

export async function getProvidersByUserIdAction(userId: string) {
	return await db.account.findMany({
		where: {
			userId
		},
		select: {
			provider: true
		}
	})
}
