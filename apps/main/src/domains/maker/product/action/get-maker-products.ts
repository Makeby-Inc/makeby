'use server'

import { db, type Prisma, ProductStatus } from '@core/models'
import { authAction } from '@core/react'
import { z } from 'zod'

const getMakerProductsAction = authAction
	.schema(
		z.object({
			status: z.nativeEnum(ProductStatus)
		})
	)
	.metadata({ actionName: 'getMakerProductsAction' })
	.action(async ({ parsedInput: { status }, ctx: { userId } }) => {
		const products = await getMakerProducts(userId, status)
		return products
	})

async function getMakerProducts(userId: string, status: ProductStatus) {
	const products = await db.product.findMany({
		where: {
			maker: {
				userId
			},
			status
		},
		include: {
			options: true
		}
	})
	return products
}
export type ProductData = Prisma.ProductGetPayload<{
	include: {
		options: true
	}
}>

export { getMakerProductsAction }
