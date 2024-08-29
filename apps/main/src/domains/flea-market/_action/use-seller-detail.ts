'use client'

import { useAction } from '@core/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import {
	getSellerProductsAction,
	getSellerReviewsAction
} from '#/flea-market/product'
import { useSellerStore } from '#/flea-market/_action/use-seller-store'

export const useSellerDetail = () => {
	const { id } = useParams()

	const {
		productsLoading,
		reviewsLoading,
		products,
		reviews,
		category,
		productPage,
		reviewPage,
		productStatusBy,
		setProductsLoading,
		setReviewsLoading,
		setProducts,
		setReviews
	} = useSellerStore()

	const getSellerProducts = useAction(getSellerProductsAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setProducts(data)
				setProductsLoading(false)
			}
		},
		onError: () => {
			setProductsLoading(false)
		},
		onExecute: () => {
			setProductsLoading(true)
		}
	})

	const getSellerReviews = useAction(getSellerReviewsAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setReviews(data)
				setReviewsLoading(false)
			}
		},
		onError: () => {
			setReviewsLoading(false)
		},
		onExecute: () => {
			setReviewsLoading(true)
		}
	})

	useEffect(() => {
		getSellerProducts.execute({
			page: productPage,
			sellerId: id as string,
			productStatusBy
		})
		getSellerReviews.execute({
			page: reviewPage,
			sellerId: id as string
		})
	}, [category, productPage, reviewPage, productStatusBy, id])

	return {
		productsLoading,
		reviewsLoading,
		products,
		reviews
	}
}
