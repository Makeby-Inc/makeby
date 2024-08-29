'use server'

import { db, type Prisma } from '@core/models'
import { action } from '@core/react'
import { productListInclude } from '#/shop/product/model/product-list-item'
import {
	type ProductFilterDto,
	productFilterDto
} from '#/shop/product/model/product-filter-dto'
import { DEFAULT_PAGE_SIZE } from '~/shared'

export const getFilteredProductsAction = action
	.metadata({ actionName: 'getFilteredProducts' })
	.schema(productFilterDto)
	.action(async ({ parsedInput }) => {
		const { categorySlug, excludeSoldout, sortBy, page, shopSlug } = parsedInput

		const products = await getFilteredProducts({
			categorySlug,
			excludeSoldout,
			sortBy,
			page,
			shopSlug
		})

		return products
	})

async function getFilteredProducts({
	categorySlug,
	excludeSoldout,
	sortBy,
	page,
	shopSlug
}: ProductFilterDto) {
	const fallPage = page || 1
	const fallbackSortBy = [
		'최신순',
		'리뷰많은순',
		'낮은가격순',
		'높은가격순'
	].includes(sortBy || '')
		? (sortBy as '최신순' | '리뷰많은순' | '낮은가격순' | '높은가격순')
		: '최신순'

	const take = DEFAULT_PAGE_SIZE * fallPage

	const filter: Prisma.ProductWhereInput = {
		AND: [
			{
				status: 'RELEASED'
			},
			categorySlug
				? {
						productCategory: {
							slug: categorySlug
						}
				  }
				: {},
			excludeSoldout
				? {
						options: {
							every: {
								stock: {
									gt: 0
								}
							}
						}
				  }
				: {},
			shopSlug
				? {
						maker: {
							slug: shopSlug
						}
				  }
				: {}
		]
	}

	const sortMap: Record<
		'최신순' | '리뷰많은순' | '낮은가격순' | '높은가격순',
		Prisma.ProductOrderByWithRelationInput
	> = {
		최신순: {
			createdAt: 'desc'
		},
		리뷰많은순: {
			reviews: {
				_count: 'desc'
			}
		},
		낮은가격순: {
			representativePrice: 'asc'
		},
		높은가격순: {
			representativePrice: 'desc'
		}
	}

	const sort: Prisma.ProductOrderByWithRelationInput = sortMap[fallbackSortBy]

	const products = await db.product.findMany({
		include: productListInclude,
		where: filter,
		orderBy: sort,
		skip: take * (fallPage - 1),
		take
	})

	return products
}
