'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { productEditDto, type ProductEditDto } from '#/maker/product/model'

const updateProductAction = authAction
	.schema(productEditDto)
	.metadata({ actionName: 'updateProductAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await updateProduct(userId, dto)
	})

async function updateProduct(userId: string, dto: ProductEditDto) {
	const { options, categoryId, productId, ...data } = dto
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

	await Promise.all([
		db.productOption.deleteMany({
			where: {
				prouductId: productId
			}
		}),
		db.productOption.createMany({
			data: options.map(({ thumbnailUrl, title, description, price, stock }) => ({
				prouductId: productId,
				thumbnailUrl,
				title,
				description,
				price: price || 0,
				stock: stock || 0
			}))
		})
	])

	await db.product.update({
		where: {
			id: productId,
			makerId: maker.id
		},
		data: {
			...data,
			categoryId: Number(categoryId),
			representativePrice: lowestPrice
		}
	})
}

export { updateProductAction }
