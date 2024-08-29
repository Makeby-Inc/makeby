import { Button } from '@design-system/ui'
import Link from 'next/link'
import { type ProductStatus } from '@core/models'
import { MobileBottomStickySection } from '@design-system/template'
import { ProductListSection, ProductTab } from '#/maker'
import { getMakerProductsAction } from '#/maker/product/action'

export default async function ProductDashboardPage({
	searchParams: { status = 'released' }
}: {
	searchParams: {
		status: string
	}
}) {
	const products = await getMakerProductsAction({
		status: status.toLocaleUpperCase() as ProductStatus
	})

	return (
		<div className="pc:gap-6 flex min-h-screen flex-col">
			<div className="max-pc:hidden flex items-center gap-6">
				<h1 className="flex-1 text-xl font-semibold">내 상품 내역</h1>
				<Button size="sm" asChild>
					<Link href="/maker/new">신규 상품 등록</Link>
				</Button>
			</div>
			<ProductTab />
			<ProductListSection products={products?.data || []} />
			<MobileBottomStickySection>
				<Button size="lg" className="w-full text-base font-semibold" asChild>
					<Link href="/maker/new">신규 상품 등록</Link>
				</Button>
			</MobileBottomStickySection>
		</div>
	)
}
