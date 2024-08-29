import { type Prisma } from '@core/models'

export const myOrderInclude = {
	orderItems: {
		include: {
			option: {
				include: {
					product: {
						include: {
							maker: {
								select: {
									name: true,
									businessName: true
								}
							}
						}
					}
				}
			},
			productReview: true
		}
	}
} satisfies Prisma.ProductOrderInclude

export type MyOrder = Prisma.ProductOrderGetPayload<{
	include: typeof myOrderInclude
}>
