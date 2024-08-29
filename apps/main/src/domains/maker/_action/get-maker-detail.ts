'use server'

import { db } from '@core/models'
import { authAction } from '@core/react'
import { makerDetailInclude } from '#/maker/_model'

const getMakerDetailAction = authAction
	.metadata({
		actionName: 'getMakerDetail'
	})
	.action(async ({ ctx: { userId } }) => {
		const maker = await getMakerDetail(userId)
		return maker
	})

const getMakerDetail = async (userId: string) => {
	const maker = await db.maker.findUniqueOrThrow({
		where: {
			userId
		},
		include: makerDetailInclude
	})

	const totalReviewCount = await db.productReview.count({
		where: {
			product: {
				makerId: maker.id
			}
		}
	})

	const totalOrderCount = await db.productOrderItem.count({
		where: {
			option: {
				product: {
					makerId: maker.id
				}
			}
		}
	})

	return { maker, totalReviewCount, totalOrderCount }
}
export { getMakerDetailAction }
