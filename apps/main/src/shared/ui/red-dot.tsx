import { cn } from '@core/utils'

export function RedDot({
	count,
	className
}: {
	count?: number
	className?: string
}): JSX.Element {
	return (
		<div
			className={cn(
				'text-primary-foreground bg-primary absolute -bottom-0.5 -right-1 flex h-[15px] w-[15px] items-center justify-center rounded-full text-center text-xs',
				className
			)}
		>
			{count}
		</div>
	)
}
