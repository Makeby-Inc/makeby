import { cn } from '@core/utils'

interface MobileBottomStickySectionProps {
	children: React.ReactNode
	className?: string
}

const MobileBottomStickySection = ({
	children,
	className
}: MobileBottomStickySectionProps) => {
	return (
		<div
			className={cn(
				'pc:hidden bg-background sticky bottom-0 z-20 h-fit',
				className
			)}
		>
			<section className="p-4">{children}</section>
		</div>
	)
}
MobileBottomStickySection.displayName = 'MobileBottomStickySection'

export { MobileBottomStickySection }
