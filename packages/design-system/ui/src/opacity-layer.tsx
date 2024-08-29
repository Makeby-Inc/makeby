import { cn } from '@core/utils'

interface OpacityLayerProps {
	className?: string
}

/**
 * 컴포넌트 hover 시 영역을 어둡게하는 레이어입니다.
 * - hover 시 어둡게 처리될 컴포넌트 내부에 `OpacityLayer`를 내부에 추가해준 후, 최상단 `className`에 `relative`와 `group`을 추가해주세요.
 * @example
 * ```tsx
 * <div className="relative group">
 *  <OpacityLayer />
 * </div>
 * ```
 */
export function OpacityLayer({ className }: OpacityLayerProps) {
	return (
		<div
			className={cn(
				'bg-foreground/0 group-hover:bg-foreground/[0.08] pointer-events-none absolute left-0 top-0 z-0 h-full w-full transition',
				className
			)}
		/>
	)
}
OpacityLayer.displayName = 'OpacityLayer'
