'use client'

import { cn } from '@core/utils'
import { Skeleton } from '@design-system/ui'
import { useMonthlyOrderSummary } from '#/maker/dashboard/model'
import { DashboardSection } from '#/maker/dashboard/ui/dashboard-section'

export function MonthlyDashboard(): JSX.Element {
	const {
		loading,
		totalOrderAmount,
		totalCancelAmount,
		totalExchangeAmount,
		totalRevenue
	} = useMonthlyOrderSummary()

	return (
		<DashboardSection>
			<div className="grid gap-4">
				<h5 className="font-medium">판매 정보 요약</h5>

				<ul className="border-secondary-foreground divide-y border-y">
					<ListItem label="총 주문금액" value={totalOrderAmount} loading={loading} />
					<ListItem
						label="반품 금액"
						value={totalExchangeAmount}
						loading={loading}
					/>
					<ListItem label="취소 금액" value={totalCancelAmount} loading={loading} />
					<ListItem
						label="총 매출액"
						value={totalRevenue}
						loading={loading}
						className="font-semibold text-black"
					/>
				</ul>
			</div>
		</DashboardSection>
	)
}

interface ListItemProps {
	label: string
	value: number
	className?: string
	loading?: boolean
}

function ListItem({
	label,
	value,
	loading = false,
	className
}: ListItemProps): JSX.Element {
	return (
		<div className={cn('pc:text-base flex justify-between p-2 text-sm')}>
			<span className={cn('text-secondary-foreground', className)}>{label}</span>
			{loading ? (
				<Skeleton className="h-5 w-[100px]" />
			) : (
				<span className="font-semibold">{value.toLocaleString()}원</span>
			)}
		</div>
	)
}
