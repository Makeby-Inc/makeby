'use server'

import { authAction } from '@core/react'
import { db } from '@core/models'
import { revalidatePath } from 'next/cache'
import { createCartDto } from '#/shop/cart/model'

export const createCartItemsAction = authAction
	.metadata({
		actionName: 'createCartItems'
	})
	.schema(createCartDto)
	.action(async ({ parsedInput, ctx }) => {
		const userId = ctx.userId
		const items = parsedInput.items

		for (const item of items) {
			// 장바구니에 이미 있는 상품인지 확인한다.
			const existingItem = await db.shoppingCartItem.findFirst({
				where: {
					userId,
					productOptionId: item.optionId
				}
			})

			if (existingItem) {
				// 이미 장바구니에 있는 상품이라면 수량만 증가시킨다.
				await db.shoppingCartItem.update({
					where: {
						id: existingItem.id
					},
					data: {
						quantity: existingItem.quantity + item.quantity
					}
				})
			} else {
				// 장바구니에 없는 상품이라면 새로 추가한다.
				await db.shoppingCartItem.create({
					data: {
						userId,
						productOptionId: item.optionId,
						quantity: item.quantity
					}
				})
			}
		}

		revalidatePath('/shop/cart')
		revalidatePath('/shop/checkout')

		return true
	})
