import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'

interface PaginationButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	direction: 'left' | 'right'
	size?: 'sm' | 'md' | 'lg' // 36px, 48px, 60px,
	className?: string
}
/**
 * 캐러셀 페이지 이동 버튼 컴포넌트입니다.
 * @params direction - 왼쪽 버튼 또는 오른쪽 버튼
 * @params size - 버튼 크기 sm(36px), md(48px), lg(60px)
 */
export function PaginationButton({
	direction,
	size = 'md',
	className,
	...props
}: PaginationButtonProps) {
	return (
		<button
			className={cn(
				'bg-foreground/50 text-background rounded-button-md z-30 flex h-12 w-12 items-center justify-center',
				direction === 'right' && 'scale-x-[-1]',
				size === 'sm' && 'rounded-button-sm h-9 w-9',
				size === 'lg' && 'rounded-button-lg h-[60px] w-[60px]',
				className
			)}
			{...props}
		>
			<Icon
				name="ChevronLeftIcon"
				size={size}
				className={cn(size === 'lg' && 'h-7 w-7')}
			/>
		</button>
	)
}
PaginationButton.displayName = 'PaginationButton'
