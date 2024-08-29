'use server'

import { db } from '@core/models'
import { newProductInclude } from '#/landing/_model'

export async function getNewProductsAction() {
	const products = await db.product.findMany({
		where: {
			status: 'RELEASED'
		},
		include: newProductInclude,
		orderBy: {
			createdAt: 'desc'
		},
		take: 10
	})
	return products
}
