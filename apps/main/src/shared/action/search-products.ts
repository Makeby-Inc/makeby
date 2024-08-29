'use server'

import { db } from '@core/models'
import { productListInclude } from '#/shop/product/model'
import { fleamarketProductListInclude } from '#/flea-market/product/model'

export const searchProductsAction = async (keyword: string | undefined) => {
	const defaultResult = {
		products: [],
		fleamarketProducts: []
	}

	if (!keyword) return defaultResult

	const formattedKeyword = keyword.trim()
	if (!formattedKeyword) return defaultResult

	const [products, fleamarketProducts] = await Promise.all([
		searchProducts(formattedKeyword),
		searchFleaMarketProducts(formattedKeyword)
	])

	return {
		products,
		fleamarketProducts
	}
}

const searchProducts = async (keyword: string) => {
	const products = await db.product.findMany({
		where: {
			OR: [
				{ title: { contains: keyword } },
				{
					maker: {
						name: {
							contains: keyword
						}
					}
				},
				{
					options: {
						some: {
							title: {
								contains: keyword
							}
						}
					}
				}
			]
		},
		include: productListInclude
	})

	return products
}

const searchFleaMarketProducts = async (keyword: string) => {
	const products = await db.fleaMarketProduct.findMany({
		where: {
			OR: [
				{ title: { contains: keyword } },
				{
					tags: {
						some: {
							name: {
								contains: keyword
							}
						}
					}
				},
				{
					seller: {
						name: {
							contains: keyword
						}
					}
				}
			]
		},
		include: fleamarketProductListInclude
	})

	return products
}
