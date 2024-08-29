import { Banner, MobileBottomStickySection } from '@design-system/template'
import { notFound } from 'next/navigation'
import { Icon } from '@design-system/icon'
import { Separator } from '@design-system/ui'
import { TagListSection } from '#/maker'
import {
	FleamarketLikeButton,
	FleamarketProductDetailTab,
	FleamarketProductSummary,
	FleamarketSellerProfileCard,
	ProductControlPopover,
	ProductViewLogger,
	getFleamarketProductDetail
} from '#/flea-market'
import { MobileDetailHeader, ProductCarouselImages } from '~/shared'
import { ChatStartButton } from '#/flea-market/chat/ui'
import { ShareButton } from '~/shared/ui/share-button'

interface FleamarketProductDetailPageProps {
	params: {
		id: string
	}
}

export async function generateMetadata({
	params: { id }
}: FleamarketProductDetailPageProps) {
	const { productDetail } = await getFleamarketProductDetail(id)
	if (!productDetail) notFound()

	return {
		title: productDetail.title,
		description: productDetail.description,
		openGraph: {
			images: productDetail.productImages
		}
	}
}

export default async function FleamarketProductDetailPage({
	params: { id }
}: FleamarketProductDetailPageProps) {
	const { productDetail, productLiked } = await getFleamarketProductDetail(id)
	if (!productDetail) notFound()

	const {
		title,
		productCategory,
		productImages,
		tags,
		seller,
		_count,
		viewCount,
		createdAt,
		tradeType,
		price,
		status
	} = productDetail

	const imageUrls = productImages
		.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
		.map((image) => image.imageUrl)
	const tagList = tags.map((tag) => tag.name)

	const sellerTradingCount = seller.fleaMarketProducts.filter(
		(product) => product.status === 'SOLD_OUT'
	).length

	const reviews = seller.fleaMarketProducts
		.filter((product) => product.review)
		.flatMap((product) => product.review)
	const totalScore = reviews.reduce(
		(sum, review) => sum + Number(review?.score),
		0
	)
	const ratingAverage = reviews.length > 0 ? totalScore / reviews.length : 0

	return (
		<div>
			<ProductViewLogger />
			<MobileDetailHeader
				pageTitle={title}
				rightAction={
					<div className="flex items-center gap-4">
						<ShareButton />
						<ProductControlPopover productStatus={status} />
					</div>
				}
				rightActionClassName="w-16"
			/>
			<section className="pc:flex pc:py-10 divide-x">
				<div className="pc:flex-1 pc:pr-10">
					<ProductCarouselImages imageUrls={imageUrls} />
					<div className="pc:hidden">
						<FleamarketProductSummary
							category={productCategory.name}
							title={title}
							price={price}
							viewCount={viewCount}
							createdAt={createdAt}
							tradeType={tradeType}
							productStatus={status}
						/>
					</div>

					<div className="pc:py-10 py-6">
						<FleamarketSellerProfileCard
							sellerId={productDetail.sellerUserId}
							profileImageUrl={productDetail.seller.image}
							name={productDetail.seller.name}
							tradingCount={sellerTradingCount}
							reviewCount={reviews.length}
							reviewRating={ratingAverage.toFixed(1)}
						/>
					</div>

					<div className="grid gap-6">
						<Banner
							prefix={<Icon name="ExclamationCircleIcon" className="h-5 w-5" solid />}
							title="중고거래에서 발생한 피해는 메잇바이에서 책임지지 않아요. 신중하게 거래를 진행해 주세요!"
							className="text-primary gap-[10px] text-sm font-medium"
						/>
						<FleamarketProductDetailTab data={productDetail} />
						<Separator />
						<TagListSection tags={tagList} />
					</div>
				</div>

				<div className="max-pc:hidden w-[480px] pl-10">
					<div className="sticky top-[calc(68px+40px)] h-fit">
						<FleamarketProductSummary
							category={productCategory.name}
							title={title}
							price={productDetail.price}
							viewCount={productDetail.viewCount}
							createdAt={productDetail.createdAt}
							tradeType={productDetail.tradeType}
							productStatus={status}
						/>
						<div className="flex items-center gap-2">
							<FleamarketLikeButton
								count={_count.likes}
								productId={id}
								isLiked={productLiked}
							/>
							<ChatStartButton sellerId={productDetail.sellerUserId} productId={id} />
						</div>
					</div>
				</div>
			</section>

			<MobileBottomStickySection>
				<div className="flex items-center gap-2">
					<FleamarketLikeButton
						count={_count.likes}
						productId={id}
						isLiked={productLiked}
					/>
					<ChatStartButton sellerId={productDetail.sellerUserId} productId={id} />
				</div>
			</MobileBottomStickySection>
		</div>
	)
}
