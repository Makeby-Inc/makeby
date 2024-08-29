'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { updateCartItemQuantityDto } from '#/shop/cart/model'

export const updateCartQuantityAction = authAction
	.metadata({
		actionName: 'updateCartQuantity'
	})
	.schema(updateCartItemQuantityDto)
	.action(async ({ ctx, parsedInput }) => {
		const userId = ctx.userId
		const { optionId, quantity } = parsedInput

		if (quantity < 1) {
			await db.shoppingCartItem.delete({
				where: {
					userId_productOptionId: {
						userId,
						productOptionId: optionId
					}
				}
			})
		} else {
			await db.shoppingCartItem.update({
				where: {
					userId_productOptionId: {
						userId,
						productOptionId: optionId
					}
				},
				data: {
					quantity
				}
			})
		}

		revalidatePath('/shop/cart')
		revalidatePath('/shop/checkout')
	})
