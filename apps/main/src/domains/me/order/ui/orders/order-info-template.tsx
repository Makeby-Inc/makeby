import { cn } from '@core/utils'

export interface OrderInfoTemplateProps {
	title: string
	items: ListItemProps[]
	alignBetween?: boolean
	className?: string
}

interface ListItemProps {
	title: string
	value: string
	valueClassName?: string
}

export function OrderInfoTemplate({
	title,
	items,
	alignBetween = false,
	className
}: OrderInfoTemplateProps): JSX.Element {
	return (
		<div className={cn('grid gap-4', className)}>
			<h5 className="text-xl font-semibold">{title}</h5>
			<ul className="border-primary border-t-2">
				{items.map((item) => (
					<li
						key={item.title}
						className={cn(
							'flex gap-2 py-4 text-sm',
							alignBetween && 'justify-between'
						)}
					>
						<span className={cn('w-[60px]', alignBetween && 'w-fit')}>
							{item.title}
						</span>
						<span className={cn('font-semibold', item.valueClassName)}>
							{item.value}
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}
