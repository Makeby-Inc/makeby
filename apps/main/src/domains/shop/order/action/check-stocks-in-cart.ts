'use server'

import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { getCartItemListAction } from '#/shop/cart/action'

export const checkStocksInCart = authAction
	.metadata({
		actionName: 'checkStocksInCart'
	})
	.action(async () => {
		const cart = await getCartItemListAction()

		if (!cart?.data || cart.data.length === 0) return false

		const isOutOfStock = cart.data.some((maker) => {
			return maker.items.some((item) => item.option.stock < item.quantity)
		})

		revalidatePath('/shop/checkout')

		return !isOutOfStock
	})
