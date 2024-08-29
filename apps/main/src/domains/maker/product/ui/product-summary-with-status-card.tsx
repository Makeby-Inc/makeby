import { type ProductStatus } from '@core/models'
import { Icon } from '@design-system/icon'
import { Banner } from '@design-system/template'
import { productStatusMap } from '~/shared'

interface ProductSummaryWithStatusCardProps {
	status: ProductStatus
	category: string
	title: string
	price: number
}

export function ProductSummaryWithStatusCard({
	status,
	category,
	title,
	price
}: ProductSummaryWithStatusCardProps) {
	return (
		<div className="pc:pt-0 grid gap-4 py-4">
			<Banner
				prefix={<Icon name="ExclamationCircleIcon" className="h-5 w-5" solid />}
				title={`현재 ${productStatusMap[status]}인 상품이에요`}
				className="bg-secondary gap-1 text-sm font-medium"
			/>
			<div className="grid gap-4 ">
				<div className="pc:gap-4 grid gap-2">
					<span className="text-primary font-medium">{category}</span>
					<h1 className="text-lg font-semibold">{title}</h1>
				</div>
				<h5 className="pc:text-3xl text-2xl font-bold">
					{price.toLocaleString()}원
				</h5>
			</div>
		</div>
	)
}
