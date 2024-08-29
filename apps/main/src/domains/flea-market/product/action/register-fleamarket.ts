'use server'

import { type TradeType, db } from '@core/models'
import { authAction } from '@core/react'
import {
	type FleaMarketRegisterDto,
	fleaMarketRegisterDto
} from '#/flea-market/product/model'

const registerFleaMarketAction = authAction
	.schema(fleaMarketRegisterDto)
	.metadata({ actionName: 'registerFleaMarketAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		const product = await registerFleaMarket(userId, dto)
		return product
	})

async function registerFleaMarket(userId: string, dto: FleaMarketRegisterDto) {
	const { categoryId, productImages, tags, tradeType, ...data } = dto
	const product = await db.fleaMarketProduct.create({
		data: {
			sellerUserId: userId,
			categoryId: Number(categoryId),
			productImages: {
				createMany: {
					data: productImages.map((url, index) => ({
						imageUrl: url,
						isPrimary: index === 0
					}))
				}
			},
			tags: {
				createMany: {
					data: tags.map((tag) => ({ name: tag }))
				}
			},
			tradeType: tradeType as TradeType,
			...data
		}
	})
	return product
}

export { registerFleaMarketAction }
