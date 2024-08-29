'use client'

import { Line, LineChart, Tooltip, XAxis } from 'recharts'
import {
	ScrollArea,
	ScrollBar,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from '@design-system/ui'
import { useWeeklyOrderSummaryStore } from '#/maker/dashboard/model/use-weekly-order-summary-store'
import { DashboardSection } from '#/maker/dashboard/ui/dashboard-section'
import { useWeeklyOrderSummary } from '#/maker/dashboard/model/use-weekly-order-summary'
import { getMonthWeekByWeekNumber } from '~/shared'

export function WeeklyDashboard(): JSX.Element {
	const { dailyItems, totalRevenueAmount, totalRevenueCount, weekNumber, year } =
		useWeeklyOrderSummaryStore()
	const { loading } = useWeeklyOrderSummary()
	const { month, monthWeek } = getMonthWeekByWeekNumber({ year, weekNumber })

	const data = dailyItems.map((item) => ({
		...item,
		date: item.date.toLocaleDateString('ko-KR', {
			timeZone: 'Asia/Seoul',
			day: '2-digit',
			weekday: 'short'
		})
	}))

	return (
		<DashboardSection>
			<div className="grid gap-4">
				<h5>일별 매출 현황</h5>
				<ScrollArea className="overflow-x-auto">
					<LineChart
						data={data}
						width={720}
						height={300}
						margin={{ left: 20, right: 70 }}
					>
						<XAxis dataKey="date" interval={0} textAnchor="start" />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="totalRevenueAmount"
							name="총 매출액"
							stroke="#8571F8"
							dot
						/>
					</LineChart>
					<ScrollBar orientation="horizontal" className="pc:hidden" />
				</ScrollArea>
			</div>
			<div className="grid gap-4">
				<h5>매출 현황</h5>
				<ScrollArea className="overflow-x-auto">
					<Table className="text-sm">
						<TableHeader className="bg-secondary">
							<TableRow>
								<TableCell>일자</TableCell>
								<TableCell>주문 수</TableCell>
								<TableCell>매출</TableCell>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((i) => (
								<TableRow key={i.date}>
									<TableCell className="text-secondary-foreground">{i.date}</TableCell>
									<TableCell>{i.totalRevenueCount}</TableCell>
									<TableCell>{i.totalRevenueAmount.toLocaleString()}원</TableCell>
								</TableRow>
							))}
							<TableRow>
								<TableCell className="text-secondary-foreground shrink-0">
									{year}년 {month}월 {monthWeek}주차 합계
								</TableCell>
								<TableCell className="shrink-0">{totalRevenueCount}</TableCell>
								<TableCell className="shrink-0">
									{totalRevenueAmount.toLocaleString()}원
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
		</DashboardSection>
	)
}
