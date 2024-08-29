'use server'

import { db } from '@core/models'
import { action } from '@core/react'

export const getProductCategoriesAction = action
	.metadata({ actionName: 'getProductCategories' })
	.action(async () => {
		const categories = await getProductCategories()
		return categories
	})

async function getProductCategories() {
	const categories = await db.productCategory.findMany({
		orderBy: {
			orderIndex: 'asc'
		}
	})
	return categories
}
