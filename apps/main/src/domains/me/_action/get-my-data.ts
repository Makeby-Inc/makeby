'use server'

import { db } from '@core/models'
import { USER_INFORMATION_SELECT_CONFIG } from '#/me/_model'

export async function getMyDataAction(id: string) {
	const user = await db.user.findUniqueOrThrow({
		where: { id },
		select: USER_INFORMATION_SELECT_CONFIG
	})
	return user
}
