import { MonthlyController } from '#/maker/dashboard/ui'
import { MonthlyDashboard } from '#/maker/dashboard/ui/monthly-dashboard'
import { WeeklyController } from '#/maker/dashboard/ui/weekly-controller'
import { WeeklyDashboard } from '#/maker/dashboard/ui/weekly-dashboard'

export default function OrderDashboardPage() {
	return (
		<div className="max-pc:p-4 pc:gap-[60px] grid gap-10">
			{/* 월별 요약 */}
			<div className="grid gap-4">
				<MonthlyController />
				<MonthlyDashboard />
			</div>

			<div className="grid gap-4">
				<WeeklyController />
				<WeeklyDashboard />
			</div>
			{/* 주차별 요약 */}
		</div>
	)
}
