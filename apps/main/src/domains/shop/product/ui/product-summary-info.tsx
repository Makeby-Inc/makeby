import { ShareButton } from '~/shared/ui/share-button'

interface ProductSummaryInfoProps {
	category: string
	title: string
	price: number
	productId: string
}

export function ProductSummaryInfo({
	category,
	title,
	price,
	productId
}: ProductSummaryInfoProps): JSX.Element {
	return (
		<div className="pc:pt-0 grid gap-4 py-6">
			<div className="pc:gap-4 grid gap-2">
				<div className="flex justify-between">
					<span className="text-primary font-medium">{category}</span>
					<div className="max-pc:hidden">
						<ShareButton title={title} path={`/shop/products/${productId}`} />
					</div>
				</div>
				<h1 className="text-lg font-semibold">{title}</h1>
			</div>
			<h5 className="pc:text-3xl text-2xl font-bold">
				{price.toLocaleString()}원
			</h5>
		</div>
	)
}
