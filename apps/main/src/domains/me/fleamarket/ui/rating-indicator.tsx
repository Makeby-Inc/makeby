import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

interface RatingIndicatorProps {
	value: number
	max?: number
	onChange: (value: number) => void
	className?: string
}

const INIT_MAX = 5

function RatingIndicator({
	value,
	max = INIT_MAX,
	onChange,
	className
}: RatingIndicatorProps) {
	const maxArray = Array.from({ length: max }, (_, i) => i + 1)

	return (
		<div className={cn('flex items-center', className)}>
			{maxArray.map((v) => (
				<Icon
					key={v}
					name="StarIcon"
					className={cn(
						'text-cautionary h-8 w-8 cursor-pointer',
						v > value && 'text-muted'
					)}
					onClick={() => onChange(v)}
					solid
				/>
			))}
		</div>
	)
}

export { RatingIndicator }
