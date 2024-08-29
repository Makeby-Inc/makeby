import { notFound } from 'next/navigation'
import {
	FleamarketSellerProfileCard,
	SellerProfileCategories
} from '#/flea-market'
import { getFleamarketSellerDetail } from '#/flea-market/_action'
import { MobileDetailHeader } from '~/shared'

export async function generateMetadata({
	params: { id }
}: {
	params: {
		id: string
	}
}) {
	const seller = await getFleamarketSellerDetail(id)
	if (!seller) notFound()

	return {
		title: `${seller.name}님의 프로필`
	}
}

export default async function SellerProfilePage({
	params: { id }
}: {
	params: {
		id: string
	}
}) {
	const seller = await getFleamarketSellerDetail(id)
	if (!seller) notFound()

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
		<main>
			<MobileDetailHeader pageTitle="프로필" />
			<section className="pc:py-[60px] py-4">
				<div className="pc:gap-10 flex flex-col gap-4">
					<FleamarketSellerProfileCard
						type="profile"
						sellerId={id}
						profileImageUrl={seller.image}
						name={seller.name}
						tradingCount={sellerTradingCount}
						reviewCount={reviews.length}
						reviewRating={ratingAverage.toFixed(1)}
					/>
					<div className="pc:gap-10 max-pc:flex-col flex gap-4">
						<SellerProfileCategories />
					</div>
				</div>
			</section>
		</main>
	)
}
