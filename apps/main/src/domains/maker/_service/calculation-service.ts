import { type Prisma, db, type PlanType, type MakerType } from '@core/models'
import { PG_FEE } from '~/shared'

class CalculationService {
	async getAccumulatedAmountByMakerId(makerId: string) {
		const lastRecord = await db.makerCalculationRecord.findFirst({
			where: {
				makerId
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return lastRecord?.accumulatedAmount || 0
	}

	private async _createNewRecord(
		dto: Omit<
			Prisma.MakerCalculationRecordCreateInput,
			'accumulatedAmount' | 'maker'
		>,
		makerId: string
	) {
		const lastAccumulatedAmount =
			await this.getAccumulatedAmountByMakerId(makerId)
		const accumulatedAmount = lastAccumulatedAmount + dto.amount

		await db.makerCalculationRecord.create({
			data: {
				...dto,
				accumulatedAmount,
				maker: {
					connect: {
						id: makerId
					}
				}
			}
		})
	}

	private _getServiceFeeRateByPlan(plan: PlanType) {
		switch (plan) {
			case 'BASIC':
				return 0.1
			case 'ESSENTIAL':
				return 0.2
			case 'PREMIUM':
				return 0.3
		}
	}

	private _calculateDepositAmount(dto: {
		amount: number
		makerType: MakerType
	}) {
		const { amount, makerType } = dto

		if (makerType !== 'INDIVIDUAL') {
			return { depositAmount: 0, tooltip: '부가세 포함' }
		}

		const vatAmount = Math.floor(amount / 11)
		const individualTaxAmount = Math.floor((amount - vatAmount) * 0.033)
		const depositAmount = amount - vatAmount - individualTaxAmount

		return {
			depositAmount,
			tooltip:
				`공제 예정 금액\n` +
				`부가세 : ${vatAmount.toLocaleString()}원\n` +
				`원천세 : ${individualTaxAmount.toLocaleString()}원\n` +
				`실제 입금예정 금액 : ${depositAmount.toLocaleString()}원`
		}
	}

	async addRecordByOrderItemConfirmed(orderItemId: string) {
		const orderItem = await db.productOrderItem.findUniqueOrThrow({
			where: {
				id: orderItemId
			},
			include: {
				option: {
					include: {
						product: {
							include: {
								maker: true
							}
						}
					}
				},
				order: true
			}
		})

		const maker = orderItem.option.product.maker
		const makerId = maker.id
		const serviceFeeRate = this._getServiceFeeRateByPlan(maker.plan)

		const serviceFeeAmount = Math.floor(orderItem.totalPrice * serviceFeeRate)
		const PgFeeAmount = Math.floor(orderItem.totalPrice * PG_FEE)
		const amount = orderItem.totalPrice - serviceFeeAmount - PgFeeAmount

		await this._createNewRecord(
			{
				title: orderItem.option.product.title,
				amount,
				type: 'ORDER_CONFIRMATION',
				titleTooltip: `주문번호 : ${orderItem.order.orderNumber}`,
				amountTooltip:
					`공제된 금액\n` +
					`PG사 수수료 -${PgFeeAmount.toLocaleString()}원\n` +
					`플랜 수수료 -${serviceFeeAmount.toLocaleString()}원`,
				orderConfirmationRecord: {
					create: {
						orderItem: {
							connect: {
								id: orderItemId
							}
						}
					}
				}
			},
			makerId
		)
	}

	async addRecordByWithdrawalRequest(makerId: string) {
		const maker = await db.maker.findUniqueOrThrow({
			where: {
				id: makerId
			},
			include: {
				bankAccount: true
			}
		})

		if (!maker.bankAccount) throw new Error('은행 계좌 정보가 없습니다.')

		const availableAmount = await this.getAccumulatedAmountByMakerId(makerId)
		if (availableAmount < 1000)
			throw new Error('출금 가능 금액이 1,000원 미만입니다.')

		const { depositAmount, tooltip } = this._calculateDepositAmount({
			amount: availableAmount,
			makerType: maker.makerType
		})
		await this._createNewRecord(
			{
				title: `${maker.bankAccount.bankName} ${maker.bankAccount.accountNumber}`,
				amount: availableAmount * -1,
				type: 'WITHDRAWAL_COMPLETE',
				amountTooltip: tooltip,
				withdrawalRecord: {
					create: {
						depositAmount
					}
				}
			},
			makerId
		)
	}
}

export const calculationService = new CalculationService()
