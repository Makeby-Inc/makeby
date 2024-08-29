'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'
import { sellerDetailSelect } from '#/flea-market/_model'

const getSellerDetailAction = action
	.metadata({ actionName: 'getSellerDetailAction' })
	.schema(
		z.object({
			id: z.string()
		})
	)
	.action(async ({ parsedInput: { id } }) => {
		const seller = await getFleamarketSellerDetail(id)
		return seller
	})

export async function getFleamarketSellerDetail(id: string) {
	const seller = await db.user.findUnique({
		where: { id },
		select: sellerDetailSelect
	})
	return seller
}

export { getSellerDetailAction }
