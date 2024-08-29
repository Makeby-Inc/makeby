'use server'

import { type TradeType, db } from '@core/models'
import { authAction } from '@core/react'
import {
	fleaMarketUpdateDto,
	type FleaMarketUpdateDto
} from '#/flea-market/product/model'

const updateFleamarketProductAction = authAction
	.schema(fleaMarketUpdateDto)
	.metadata({ actionName: 'updateFleamarketProductAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const product = await updateFleamarketProduct(userId, dto)
		return product
	})

async function updateFleamarketProduct(
	userId: string,
	dto: FleaMarketUpdateDto
) {
	const { productId, categoryId, productImages, tags, tradeType, ...data } = dto

	await Promise.all([
		db.fleaMarketProductImage.deleteMany({
			where: {
				fleaMarketProductId: productId
			}
		}),
		db.fleaMarketProductTag.deleteMany({
			where: {
				fleaMarketProductId: productId
			}
		}),
		db.fleaMarketProductImage.createMany({
			data: productImages.map((url, index) => ({
				fleaMarketProductId: productId,
				imageUrl: url,
				isPrimary: index === 0
			}))
		}),
		db.fleaMarketProductTag.createMany({
			data: tags.map((tag) => ({
				fleaMarketProductId: productId,
				name: tag
			}))
		})
	])

	const product = await db.fleaMarketProduct.updateMany({
		where: {
			id: productId,
			sellerUserId: userId
		},
		data: {
			sellerUserId: userId,
			categoryId: Number(categoryId),
			tradeType: tradeType as TradeType,
			...data
		}
	})
	return product
}

export { updateFleamarketProductAction }
