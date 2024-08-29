import { type MetadataRoute } from 'next'
import { db } from '@core/models'
import { SITEMAP } from '~/shared'
import { getFilteredProductsAction } from '../domains/shop'
import { getFilteredFleamarketProductsAction } from '../domains/flea-market'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { baseUrl, paths } = SITEMAP

	const publicProductsData = await getFilteredProductsAction({})
	const publicFleaMarketProductsData = await getFilteredFleamarketProductsAction(
		{}
	)
	const publicShops = await db.maker.findMany({
		where: {
			status: 'APPROVED'
		}
	})

	const productPages = (publicProductsData?.data || []).map(
		(product) => `/shop/products/${product.id}`
	)
	const fleaMarketProductPages = (publicFleaMarketProductsData?.data || []).map(
		(product) => `/fleamarket/products/${product.id}`
	)
	const shopPages = publicShops.map((shop) => `/shop/detail/${shop.id}`)
	const allPages = [
		...paths,
		...productPages,
		...fleaMarketProductPages,
		...shopPages
	]

	const sitemaps = allPages.map((path) => {
		return {
			url: `${baseUrl}${path}`,
			lastModified: new Date()
		}
	})
	return sitemaps
}
