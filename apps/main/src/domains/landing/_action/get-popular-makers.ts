'use server'

import { db } from '@core/models'
import { popularMakerInclude } from '#/landing/_model'

export async function getPopularMakersAction() {
	const makers = await db.popularMaker.findMany({
		include: popularMakerInclude
	})
	return makers
}
