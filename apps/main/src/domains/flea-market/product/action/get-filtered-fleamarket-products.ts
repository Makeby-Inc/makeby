'use server'

import { type TradeType, db, type Prisma } from '@core/models'
import { action } from '@core/react'
import { fleamarketProductListInclude } from '#/flea-market/product/model/fleamarket-product-list-item'
import { DEFAULT_PAGE_SIZE } from '~/shared'
import {
	type FleamarketProductFilterDto,
	fleamarketProductFilterDto
} from '#/flea-market/product/model/fleamarket-product-filter-dto'

const getFilteredFleamarketProductsAction = action
	.metadata({ actionName: 'getFilteredFleamarketProductsAction' })
	.schema(fleamarketProductFilterDto)
	.action(async ({ parsedInput }) => {
		const { categorySlug, excludeSoldout, sortBy, tradeTypeBy, page } =
			parsedInput

		const products = await getFilteredFleamarketProducts({
			categorySlug,
			excludeSoldout,
			sortBy,
			tradeTypeBy,
			page
		})

		return products
	})

async function getFilteredFleamarketProducts({
	categorySlug,
	excludeSoldout,
	sortBy,
	tradeTypeBy,
	page
}: FleamarketProductFilterDto) {
	const fallPage = page || 1
	// const fallbackSortBy = [
	// 	'최신순',
	// 	'리뷰많은순',
	// 	'낮은가격순',
	// 	'높은가격순'
	// ].includes(sortBy || '')
	// 	? (sortBy as '최신순' | '리뷰많은순' | '낮은가격순' | '높은가격순')
	// 	: '최신순'
	const fallbackSortBy = ['최신순', '낮은가격순', '높은가격순'].includes(
		sortBy || ''
	)
		? (sortBy as '최신순' | '낮은가격순' | '높은가격순')
		: '최신순'

	const take = DEFAULT_PAGE_SIZE * fallPage

	const filter: Prisma.FleaMarketProductWhereInput = {
		AND: [
			categorySlug
				? {
						productCategory: {
							slug: categorySlug
						}
				  }
				: {},
			excludeSoldout
				? {
						OR: [{ status: 'FOR_SALE' }, { status: 'RESERVED' }]
				  }
				: {},
			tradeTypeBy
				? {
						tradeType: tradeTypeBy as TradeType
				  }
				: {}
		]
	}

	const sortMap: Record<
		// '최신순' | '리뷰많은순' | '낮은가격순' | '높은가격순',
		'최신순' | '낮은가격순' | '높은가격순',
		Prisma.FleaMarketProductOrderByWithRelationInput
	> = {
		최신순: {
			createdAt: 'desc'
		},
		// 리뷰많은순: {
		// },
		낮은가격순: {
			price: {
				nulls: 'first',
				sort: 'asc'
			}
		},
		높은가격순: {
			price: {
				nulls: 'last',
				sort: 'desc'
			}
		}
	}

	const sort: Prisma.FleaMarketProductOrderByWithRelationInput =
		sortMap[fallbackSortBy]

	const products = await db.fleaMarketProduct.findMany({
		include: fleamarketProductListInclude,
		where: filter,
		orderBy: sort,
		skip: take * (fallPage - 1),
		take
	})

	return products
}

export { getFilteredFleamarketProductsAction }
