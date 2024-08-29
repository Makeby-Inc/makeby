'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import {
	type ComplainCreateDto,
	complainCreateDto
} from '#/flea-market/product/model'

const createComplainAction = authAction
	.schema(complainCreateDto)
	.metadata({ actionName: 'createComplainAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await createComplain(userId, dto)
		return true
	})

async function createComplain(userId: string, dto: ComplainCreateDto) {
	const complain = await db.fleaMarketProductComplaint.create({
		data: {
			complainedUserId: userId,
			...dto
		}
	})
	return complain
}

export { createComplainAction }
