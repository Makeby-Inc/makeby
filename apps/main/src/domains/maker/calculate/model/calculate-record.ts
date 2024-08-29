import { type Prisma } from '@core/models'

export const makerCalculateRecordInclude = {
	orderConfirmationRecord: {
		include: {
			orderItem: {
				include: {
					option: {
						include: {
							product: true
						}
					}
				}
			}
		}
	},
	withdrawalRecord: true
} satisfies Prisma.MakerCalculationRecordInclude

export type CalculateRecord = Prisma.MakerCalculationRecordGetPayload<{
	include: typeof makerCalculateRecordInclude
}>
export type WithdrawalRecord = NonNullable<CalculateRecord['withdrawalRecord']>
export type OrderConfirmationRecord = NonNullable<
	CalculateRecord['orderConfirmationRecord']
>
