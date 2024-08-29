import { type FleaMarketProductStatus, type TradeType } from '@core/models'
import { timeFromPast } from '@core/utils'
import { ProductControlPopover } from '#/flea-market/product/ui/product-control-popover'
import { tradeTypeCommentMap } from '~/shared'
import { ShareButton } from '~/shared/ui/share-button'

interface FleamarketProductSummaryProps {
	category: string
	title: string
	price: number | null
	viewCount: number
	createdAt: Date
	tradeType: TradeType
	productStatus: FleaMarketProductStatus
}

export function FleamarketProductSummary({
	category,
	title,
	price,
	viewCount,
	createdAt,
	tradeType,
	productStatus
}: FleamarketProductSummaryProps) {
	return (
		<div className="pc:pt-0 grid gap-4 py-4">
			<div className="pc:gap-4 grid gap-2">
				<div className="flex items-center justify-between">
					<span className="text-primary font-medium">{category}</span>
					<div className="max-pc:hidden flex items-center gap-4">
						<ShareButton />
						<ProductControlPopover productStatus={productStatus} />
					</div>
				</div>
				<div className="flex items-center gap-2">
					{tradeType !== 'SELL' && (
						<span className="text-primary pc:text-xl text-lg font-semibold">
							{tradeTypeCommentMap[tradeType]}
						</span>
					)}
					<h1 className="pc:text-xl text-lg font-semibold">{title}</h1>
				</div>
			</div>
			{price ? (
				<h5 className="pc:text-3xl text-2xl font-bold">
					{price.toLocaleString()}원
				</h5>
			) : null}
			<span className="text-secondary-foreground pc:font-normal text-sm font-medium">
				{timeFromPast(createdAt)} 전 ∙ 조회수 {viewCount}
			</span>
		</div>
	)
}
