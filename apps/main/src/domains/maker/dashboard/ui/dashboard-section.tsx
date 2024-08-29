import { cn } from '@core/utils'

interface DashboardSectionProps {
	children: React.ReactNode
	className?: string
}

export function DashboardSection({
	children,
	className
}: DashboardSectionProps): JSX.Element {
	return (
		<div
			className={cn(
				'pc:p-10 grid gap-10 overflow-hidden rounded-2xl border p-4',
				className
			)}
		>
			{children}
		</div>
	)
}
