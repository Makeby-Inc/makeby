import { LocalStorageManager } from '~/shared/utils'

interface ProductData {
	productId: string
}

const RECENT_PRODUCTS_KEY = 'recentProductIds'
const MAX_RECENT_PRODUCTS = 10
const LocalStorage = LocalStorageManager()

export const setRecentProductId = (productId: string) => {
	const newProductData: ProductData = {
		productId
	}

	const storedData = LocalStorage.getItem(RECENT_PRODUCTS_KEY)
	const recentProducts = storedData
		? (JSON.parse(storedData) as ProductData[])
		: []

	if (!recentProducts.some((product) => product.productId === productId)) {
		recentProducts.unshift(newProductData)

		if (recentProducts.length > MAX_RECENT_PRODUCTS) {
			recentProducts.pop()
		}

		LocalStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(recentProducts))
	}
}

export const getRecentProductIds = (): string[] => {
	const storedData = LocalStorage.getItem(RECENT_PRODUCTS_KEY)
	if (storedData) {
		const productDataList = JSON.parse(storedData) as ProductData[]
		return productDataList.map((product) => product.productId)
	}
	return []
}
