import { Separator, Badge } from '@design-system/ui'

interface Product {
	id: string
	createdAt: Date
	updatedAt: Date
	makerId: string
	categoryId: number
	thumbnailUrl: string
	title: string
	description: string
	productImages: string[]
	tags: string[]
}

interface ProductDetailInfoProps {
	product: Product | null
	showContent?: boolean
}

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
	return (
		<div className="flex flex-col gap-6">
			<div className="text-sm">{product?.description}</div>
			<Separator orientation="horizontal" />
			<div>
				{product?.tags.map((tag) => (
					<Badge
						key={tag}
						size="sm"
						variant="secondary"
						className="text-foreground w-fit"
					>
						{`#${tag}`}
					</Badge>
				))}
			</div>
		</div>
	)
}
