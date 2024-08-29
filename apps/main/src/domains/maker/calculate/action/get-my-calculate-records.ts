'use server'

import { authAction } from '@core/react'
import { type Prisma, db } from '@core/models'
import { getMyCalculateRecordsDto } from '../model/get-my-calculate-records-dto'
import { makerCalculateRecordInclude } from '../model/calculate-record'

export const getMyCalculateRecordsAction = authAction
	.metadata({
		actionName: 'getMyCalculateRecordsAction'
	})
	.schema(getMyCalculateRecordsDto)
	.action(async ({ ctx, parsedInput }) => {
		const { userId } = ctx
		const { year, month, productId } = parsedInput
		const startDate = new Date(year, month - 1, 1)
		const endDate = new Date(year, month, 0)

		const maker = await db.maker.findUniqueOrThrow({
			where: {
				userId
			}
		})

		const filter: Prisma.MakerCalculationRecordWhereInput = {
			AND: [
				{ makerId: maker.id },
				{
					createdAt: {
						gte: startDate,
						lt: endDate
					}
				},
				productId
					? {
							orderConfirmationRecord: {
								orderItem: {
									option: {
										prouductId: productId
									}
								}
							}
					  }
					: {}
			]
		}

		const records = await db.makerCalculationRecord.findMany({
			where: filter,
			orderBy: {
				createdAt: 'desc'
			},
			include: makerCalculateRecordInclude
		})

		return records
	})
