'use client'

import { useAction } from '@core/react'
import { useEffect } from 'react'
import { getFilteredFleamarketProductsAction } from '#/flea-market/product/action/get-filtered-fleamarket-products'
import { useFleamarketProductsStore } from '#/flea-market/product/model/use-fleamarket-products-store'

export function useFleamarketProducts() {
	const {
		loading,
		categorySlug,
		excludeSoldout,
		page,
		sortBy,
		tradeTypeBy,
		products,
		setProducts,
		setLoading
	} = useFleamarketProductsStore()

	const getFilteredProducts = useAction(getFilteredFleamarketProductsAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setProducts(data)
				setLoading(false)
			}
		},
		onError: () => {
			setLoading(false)
		},
		onExecute: () => {
			setLoading(true)
		}
	})

	useEffect(() => {
		getFilteredProducts.execute({
			categorySlug,
			excludeSoldout,
			sortBy,
			tradeTypeBy,
			page
		})
	}, [categorySlug, excludeSoldout, page, sortBy, tradeTypeBy])

	return {
		loading,
		products
	}
}
