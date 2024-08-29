import { Separator } from '@design-system/ui'
import { notFound } from 'next/navigation'
import { MakerProfile } from '#/shop/_ui'
import { getProductDetail, setRecentProductId } from '#/shop/product/action'
import {
	DeliveryInfo,
	ProductDetailTabs,
	ProductLogger,
	ProductSummaryInfo
} from '#/shop/product/ui'
import {
	AddToCartButton,
	InitOption,
	LikeButton,
	MobileBottomSection,
	SelectedOptions,
	StartCheckoutButton
} from '#/shop/product/ui/_detail-action'
import { MobileDetailHeader, ProductCarouselImages } from '~/shared/ui'
import { ShareButton } from '~/shared/ui/share-button'

interface ProductDetailPageProps {
	params: {
		id: string
	}
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
	const data = await getProductDetail(params.id)
	const { productDetail: product } = data

	if (!product) notFound()
	return {
		title: `${product.title} - ${product.maker.businessName}`,
		description: product.description,
		openGraph: {
			images: product.productImages
		}
	}
}

export default async function ProductDetailPage({
	params
}: ProductDetailPageProps) {
	const data = await getProductDetail(params.id)
	const { productDetail: product, productLiked } = data

	if (!product) notFound()
	setRecentProductId(product.id)

	return (
		<>
			<ProductLogger />
			<MobileDetailHeader
				pageTitle={product.title}
				rightAction={
					<ShareButton title={product.title} path={`/shop/products/${product.id}`} />
				}
			/>

			<section className="pc:flex pc:gap-14 pc:py-10">
				<div className="pc:flex-1">
					<ProductCarouselImages imageUrls={product.productImages} />
					<div className="pc:hidden">
						<ProductSummaryInfo
							category={product.productCategory.name}
							title={product.title}
							price={product.representativePrice}
							productId={product.id}
						/>
						<Separator />
						<DeliveryInfo />
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

					<ProductDetailTabs
						reviews={product.reviews}
						content={product.description}
						tags={product.tags}
					/>
				</div>
				{/* DESKTOP */}
				<div className="max-pc:hidden sticky top-[calc(68px+40px)] h-fit w-[480px]">
					<ProductSummaryInfo
						category={product.productCategory.name}
						title={product.title}
						price={product.representativePrice}
						productId={product.id}
					/>
					<Separator />
					<DeliveryInfo />
					<Separator />
					<SelectedOptions options={product.options} />
					<div className="flex gap-2 pt-4">
						<LikeButton
							productId={product.id}
							count={product._count.likes}
							isLiked={productLiked}
						/>
						<div className="flex flex-1 gap-2">
							<AddToCartButton productId={product.id} />
							<StartCheckoutButton productId={product.id} />
						</div>
					</div>
				</div>
			</section>

			<div className="h-[60px]" />

			<MobileBottomSection
				count={product._count.likes}
				productId={product.id}
				options={product.options}
				isLiked={productLiked}
			/>

			<InitOption />
		</>
	)
}
