'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import {
	productStatusUpdateDto,
	type ProductStatusUpdateDto
} from '#/flea-market/product/model'

const updateProductStatusAction = authAction
	.schema(productStatusUpdateDto)
	.metadata({ actionName: 'updateProductStatusAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await updateProductStatus(userId, dto)
		revalidatePath(`/fleamarket/products/${dto.productId}`)
		revalidatePath(`/me/fleamarket/products`)

		return true
	})

async function updateProductStatus(
	userId: string,
	dto: ProductStatusUpdateDto
) {
	const { productId, status } = dto

	const product = await db.fleaMarketProduct.update({
		where: {
			id: productId,
			sellerUserId: userId
		},
		data: {
			status
		}
	})

	return !!product
}

export { updateProductStatusAction }
