import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { OpacityLayer } from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'

export interface MakerRecentCardProps {
	category: string
	makerName: string
	productName: string
	productId: string
	likeCount: number
	reviewCount: number
	imageUrl: string
	status: 'PENDING' | 'REVIEWING' | 'RELEASED' | 'IN_PRODUCTION'
}

export function MakerRecentCard({
	category,
	makerName,
	productName,
	productId,
	likeCount,
	reviewCount,
	imageUrl,
	status
}: MakerRecentCardProps) {
	return (
		<Link key={productId} href={`/shop/products/${productId}`}>
			<div className="flex w-fit shrink-0 flex-col items-start gap-4">
				<div className="group relative w-full overflow-hidden rounded-sm border">
					<Image
						src={imageUrl}
						alt="logo"
						width={160}
						height={160}
						className="pc:min-w-[220px] w-full min-w-[160px]"
					/>
					{status !== 'RELEASED' && (
						<>
							<OpacityLayer
								className={cn(
									'group-hover: bg-foreground/0',
									(status === 'REVIEWING' || status === 'PENDING') &&
										'bg-foreground/20 group-hover:bg-foreground/20'
								)}
							/>
							<div className="text-background rb absolute bottom-0 left-0 flex w-full items-center justify-center gap-[10px] bg-[#171717]/60 py-2 text-xs">
								{status}
							</div>
						</>
					)}
				</div>
				<div className="flex flex-col items-start gap-2">
					<div className="gap-xs flex flex-col items-start">
						<div className="text-primary text-xs">{category}</div>
						<div className="flex items-center gap-[2px]">
							<div className="text-xs font-bold">{makerName}</div>
							<Icon name="ChevronRightIcon" size="sm" />
						</div>
						<div className="text-xs">{productName}</div>
					</div>
					<div className="flex gap-2">
						<div className="text-secondary-foreground flex items-center gap-0.5 text-xs">
							<Icon name="HeartIcon" size="sm" />
							<span>{likeCount}</span>
						</div>
						<div className="text-secondary-foreground flex items-center gap-0.5 text-xs">
							<Icon name="ChatBubbleLeftIcon" size="sm" />
							<span>{reviewCount}</span>
						</div>
					</div>
					<div className="hidden">{productId}</div>
				</div>
			</div>
		</Link>
	)
}
