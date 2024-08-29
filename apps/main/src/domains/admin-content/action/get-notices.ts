import { db } from '@core/models'

export async function getNotices() {
	return await db.notice.findMany()
}
