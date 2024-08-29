import { db } from '@core/models'
import { popularProductInclude } from '#/landing/_model'

export async function getPopularProductsAction() {
	const products = await db.product.findMany({
		where: {
			status: 'RELEASED'
		},
		include: popularProductInclude,
		orderBy: {
			likes: {
				_count: 'desc'
			}
		},
		take: 10
	})

	return products
}
