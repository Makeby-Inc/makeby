'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { type MakerCartItems, cartItemInclude } from '#/shop/cart/model'

export const getCartItemListAction = authAction
	.metadata({
		actionName: 'getCartItemList'
	})
	.action(async ({ ctx }) => {
		const userId = ctx.userId

		const cartItems = await db.shoppingCartItem.findMany({
			where: {
				userId,
				option: {
					product: {
						status: 'RELEASED'
					}
				}
			},
			include: cartItemInclude,
			orderBy: {
				option: {
					price: 'asc'
				}
			}
		})

		// Group cart items by maker
		const makerCartItemList: MakerCartItems[] = []

		cartItems.forEach((cartItem) => {
			const maker = cartItem.option.product.maker

			const makerCartItems = makerCartItemList.find(
				(i) => i.name === maker.businessName
			)

			if (makerCartItems) {
				makerCartItems.items.push(cartItem)
			} else {
				makerCartItemList.push({
					name: maker.businessName,
					profileImageUrl: maker.profileUrl,
					slug: maker.slug,
					items: [cartItem]
				})
			}
		})

		return makerCartItemList
	})
