'use server'

import { db } from '@core/models'
import { action } from '@core/react'
import { z } from 'zod'
import { recentProductInclude } from '#/landing/_model'

const getRecentViewedProductsAction = action
	.metadata({ actionName: 'getRecentViewedProductsAction' })
	.schema(
		z.object({
			ids: z.array(z.string())
		})
	)
	.action(async ({ parsedInput: { ids } }) => {
		return await getRecentViewedProducts(ids)
	})

export async function getRecentViewedProducts(ids: string[]) {
	const products = await db.product.findMany({
		where: {
			id: {
				in: ids
			},
			status: 'RELEASED'
		},
		include: recentProductInclude,
		orderBy: {
			createdAt: 'desc'
		},
		take: 10
	})
	return products
}

export { getRecentViewedProductsAction }
