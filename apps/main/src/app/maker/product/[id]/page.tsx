import { type ProductStatus } from '@core/models'
import { MobileBottomStickySection } from '@design-system/template'
import { Button, Separator } from '@design-system/ui'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MakerProfile, getProductDetail } from '#/shop'
import {
	InformationEditRequestDialog,
	ProductDetailTab,
	ProductSummaryWithStatusCard,
	ReviewCancelDialog,
	TagListSection
} from '#/maker'
import { MobileDetailHeader, ProductCarouselImages } from '~/shared/ui'

interface NoticeDetailPageProps {
	params: {
		id: string
	}
}

export const metadata = {
	title: '상품 상세'
}

export default async function MakerProductDetailPage({
	params: { id }
}: NoticeDetailPageProps) {
	const data = await getProductDetail(id)
	const { productDetail: product } = data
	if (!product) notFound()

	return (
		<>
			<MobileDetailHeader pageTitle={product.title} />

			<section className="pc:flex pc:py-10 divide-x">
				<div className="pc:flex-1 pc:pr-10">
					<ProductCarouselImages imageUrls={product.productImages} />
					<div className="pc:hidden">
						<ProductSummaryWithStatusCard
							status={product.status}
							category={product.productCategory.name}
							title={product.title}
							price={product.representativePrice}
						/>
						<Separator />
					</div>

					<div className="pc:py-10 py-6">
						<MakerProfile
							slug={product.maker.slug}
							name={product.maker.businessName}
							businessName={product.maker.businessName}
							profileUrl={product.maker.profileUrl}
							socialNetworkIds={product.maker.socialIds}
						/>
					</div>

					<div className="grid gap-6">
						<ProductDetailTab data={product} />
						<Separator />
						<TagListSection tags={product.tags} />
					</div>
				</div>

				<div className="max-pc:hidden w-[480px] pl-10">
					<div className="sticky top-[calc(68px+40px)] h-fit">
						<ProductSummaryWithStatusCard
							status={product.status}
							category={product.productCategory.name}
							title={product.title}
							price={product.representativePrice}
						/>
						<ControlButtons productId={id} status={product.status} />
					</div>
				</div>
			</section>

			<MobileBottomStickySection>
				<ControlButtons productId={id} status={product.status} />
			</MobileBottomStickySection>
		</>
	)
}

function ControlButtons({
	status,
	productId
}: {
	status: ProductStatus
	productId: string
}) {
	return (
		<div className="flex items-center gap-3">
			{status === 'PENDING' ? (
				<Button size="lg" className="flex-1 rounded-lg text-base" asChild>
					<Link href={`/maker/product/edit/${productId}`}>정보 수정</Link>
				</Button>
			) : (
				<>
					{status === 'REVIEWING' && <ReviewCancelDialog productId={productId} />}
					<InformationEditRequestDialog />
				</>
			)}
		</div>
	)
}
