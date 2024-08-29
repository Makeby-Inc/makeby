'use client'
import { cn } from '@core/utils'
import { TableCell, TableRow } from '@design-system/ui'
import { type CalculationType } from '@core/models'
import { type CalculateRecord } from '../model/calculate-record'
import { TooltipIcon } from './tooltip-icon'

interface CalculateRecordRowProps {
	record: CalculateRecord
	className?: string
}

const typeMap: Record<CalculationType, { title: string; className: string }> = {
	DEDUCTION: {
		title: '선제작 공제',
		className: 'text-yellow-500 bg-yellow-500/10'
	},
	ORDER_CONFIRMATION: {
		title: '주문확정',
		className: 'text-foreground bg-secondary'
	},
	WITHDRAWAL_COMPLETE: {
		title: '출금신청',
		className: 'text-primary bg-base-50'
	}
}

export function CalculateRecordRow({
	record,
	className
}: CalculateRecordRowProps): JSX.Element {
	const typeData = typeMap[record.type]

	const orderItem = record.orderConfirmationRecord?.orderItem

	return (
		<TableRow key={record.id}>
			{/* 일자 */}
			<TableCell className="w-[200px]">
				<div className="flex items-center gap-2">
					<div
						className={cn(
							'w-[70px] rounded-lg py-1 text-center text-xs',
							typeData.className
						)}
					>
						{typeData.title}
					</div>
					<div>
						<span className="text-sm font-medium">
							{record.createdAt.toLocaleDateString('ko-KR')}
						</span>
						{record.withdrawalRecord?.expectedDepositDate ? (
							<span className="mt-0.5 text-xs text-gray-400">
								입금예정일 (
								{record.withdrawalRecord.expectedDepositDate.toLocaleDateString(
									'ko-KR'
								)}
								)
							</span>
						) : null}
					</div>
				</div>
			</TableCell>

			{/* 내용 */}
			<TableCell className="w-[280px]">
				<div>
					<div className="flex items-center gap-1">
						<h5 className="text-sm font-semibold">{record.title}</h5>
						{record.titleTooltip ? <TooltipIcon text={record.titleTooltip} /> : null}
					</div>
					{orderItem ? (
						<span className="text-secondary-foreground text-xs">
							옵션 : {orderItem.option.title} x {orderItem.quantity}
						</span>
					) : null}
				</div>
			</TableCell>

			{/* 출금 가능 금액 */}
			<TableCell className="text-sm font-semibold">
				<div className="flex items-center gap-1">
					<span>
						{record.amount > 0 ? '+' : ''}
						{record.amount.toLocaleString()}원
					</span>
					{record.amountTooltip ? <TooltipIcon text={record.amountTooltip} /> : null}
				</div>
			</TableCell>

			{/* 누적 */}
			<TableCell>
				<span className="text-secondary-foreground text-xs">
					잔액 {record.accumulatedAmount.toLocaleString()}원
				</span>
			</TableCell>
		</TableRow>
	)
}
