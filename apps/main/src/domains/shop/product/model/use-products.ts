'use client'

import { useAction } from '@core/react'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getFilteredProductsAction } from '#/shop/product/action/get-filtered-products'
import { useProductsStore } from '#/shop/product/model/use-products-store'

export function useProducts() {
	const {
		loading,
		categorySlug,
		excludeSoldout,
		page,
		sortBy,
		products,
		setProducts,
		setLoading
	} = useProductsStore()
	const params = useParams()
	const shopSlug = params.slug as string | undefined

	const getFilteredProducts = useAction(getFilteredProductsAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setProducts(data)
				setLoading(false)
			}
		},
		onError: (error) => {
			console.error(error)
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
			page,
			shopSlug
		})
	}, [categorySlug, excludeSoldout, page, sortBy, shopSlug])

	return {
		loading,
		products
	}
}
