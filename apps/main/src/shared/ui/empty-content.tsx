import { cn } from '@core/utils'

interface EmptyContentProps {
	title: string
	description?: string
	actionSlot?: React.ReactNode
	className?: string
}

export function EmptyContent({
	title,
	description,
	actionSlot,
	className
}: EmptyContentProps) {
	return (
		<div
			className={cn(
				'flex w-full items-center justify-center text-center',
				className
			)}
		>
			<div className="grid h-fit gap-6">
				<div className="grid gap-1">
					<span className="text-secondary-foreground text-xl font-semibold">
						{title}
					</span>
					<span className="text-muted-foreground whitespace-pre-line font-medium">
						{description}
					</span>
				</div>
				{actionSlot ? <div>{actionSlot}</div> : null}
			</div>
		</div>
	)
}
