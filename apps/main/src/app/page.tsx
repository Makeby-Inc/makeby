import {
	MainBanner,
	RecentViewedProducts,
	PopularProducts,
	PopularMakers,
	RecommendedProducts,
	NewProducts
} from '#/landing/_ui'
import {
	getBannerImagesAction,
	getPopularMakersAction,
	getPopularProductsAction,
	getRecommendedProductsAction,
	getNewProductsAction
} from '#/landing/_action'

export default async function Home() {
	const [
		banners,
		popularMakersData,
		popularProductsData,
		recommendedProductsData,
		newProductsData
	] = await Promise.all([
		getBannerImagesAction(),
		getPopularMakersAction(),
		getPopularProductsAction(),
		getRecommendedProductsAction(),
		getNewProductsAction()
	])

	return (
		<section>
			<div className="w-full">
				<MainBanner banners={banners} />
				<div className="pc:gap-[100px] pc:px-[100px] pc:py-20 flex flex-col gap-[37px] py-6">
					<RecentViewedProducts />
					<PopularMakers makersData={popularMakersData} />
					<PopularProducts productsData={popularProductsData} />
					<RecommendedProducts productsData={recommendedProductsData} />
					<NewProducts productsData={newProductsData} />
				</div>
			</div>
		</section>
	)
}
