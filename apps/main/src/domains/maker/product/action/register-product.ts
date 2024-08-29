'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import {
	type ProductRegisterDto,
	productRegisterDto
} from '#/maker/product/model'

const registerProductAction = authAction
	.schema(productRegisterDto)
	.metadata({ actionName: 'registerProduct' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await registerProduct(userId, dto)
	})

async function registerProduct(userId: string, dto: ProductRegisterDto) {
	const { options, categoryId, ...data } = dto
	const maker = await db.maker.findUniqueOrThrow({
		where: { userId },
		select: {
			id: true
		}
	})

	const optionPrices = options.map(({ price }) => price || 0)

	const lowestPrice = optionPrices.reduce((acc: number, price) => {
		return price < acc ? price : acc
	}, optionPrices[0] || 0)

	await db.product.create({
		data: {
			makerId: maker.id,
			...data,
			categoryId: Number(categoryId),
			representativePrice: lowestPrice,
			options: {
				createMany: {
					data: options.map(
						({ thumbnailUrl, title, description, price, stock }) => ({
							thumbnailUrl,
							title,
							description,
							price: price || 0,
							stock: stock || 0
						})
					)
				}
			}
		}
	})
}

export { registerProductAction }
