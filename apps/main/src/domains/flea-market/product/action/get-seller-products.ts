'use server'

import { type Prisma, db, type FleaMarketProductStatus } from '@core/models'
import { action } from '@core/react'
import {
	fleamarketProductListInclude,
	sellerProductDto,
	type SellerProductDto
} from '#/flea-market/product/model'

const getSellerProductsAction = action
	.metadata({ actionName: 'getSellerProductsAction' })
	.schema(sellerProductDto)
	.action(async ({ parsedInput: dto }) => {
		const products = await getSellerProducts(dto)
		return products
	})

async function getSellerProducts({
	sellerId,
	// page,
	productStatusBy
}: SellerProductDto) {
	// const fallPage = page || 1
	// const take = DEFAULT_PRODUCT_PAGE_SIZE
	// const skip = DEFAULT_PRODUCT_PAGE_SIZE * (fallPage - 1)

	const filter: Prisma.FleaMarketProductWhereInput = {
		AND: [
			{
				sellerUserId: sellerId
			},
			productStatusBy
				? {
						status: productStatusBy as FleaMarketProductStatus
				  }
				: {}
		]
	}

	const products = await db.fleaMarketProduct.findMany({
		where: filter,
		include: fleamarketProductListInclude
		// skip,
		// take
	})

	return products
}
export { getSellerProductsAction }
