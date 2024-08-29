import { db } from '@core/models'

export async function getMaker() {
	return db.maker.findMany({})
}
