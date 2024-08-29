'use client'

import { useAction } from '@core/react'
import { useEffect } from 'react'
import { getTradeProductsAction } from '#/me/fleamarket/action/get-trade-products'
import { useTradeProductsStore } from '#/me/fleamarket/action/use-trade-products-store'

export const useTradeProductsDetail = () => {
	const {
		products,
		loading,
		tradeTypeBy,
		tradeStatusBy,
		page,
		setProducts,
		setLoading
	} = useTradeProductsStore()

	const getTradeProducts = useAction(getTradeProductsAction, {
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
		setLoading(true)
		setProducts([])
		getTradeProducts.execute({
			tradeTypeBy,
			tradeStatusBy,
			page
		})
	}, [tradeTypeBy, tradeStatusBy, page])

	return {
		loading,
		products
	}
}
