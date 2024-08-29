import { db } from '@core/models'

export async function getDetailNotices(id: number) {
	return await db.notice.findUnique({
		where: {
			id: Number(id)
		}
	})
}
