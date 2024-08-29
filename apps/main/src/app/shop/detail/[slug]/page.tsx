import { notFound } from 'next/navigation'
import { getShopBySlugAction } from '#/shop/_action'
import { MobileDetailHeader, getProductCategoriesAction } from '~/shared'
import {
	FilterSoldoutButton,
	MakerProfile,
	ProductCardList,
	ProductCategories,
	ProductsSortbyDropdown
} from '#/shop'

interface ShopDetailPageProps {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: ShopDetailPageProps) {
	const { slug } = params
	const result = await getShopBySlugAction({ slug })

	if (!result?.data) notFound()

	return {
		title: `${result.data.businessName}님의 상점`
	}
}

export default async function ShopDetailPage({ params }: ShopDetailPageProps) {
	const { slug } = params

	const [makerData, categories] = await Promise.all([
		getShopBySlugAction({ slug }),
		getProductCategoriesAction()
	])

	if (!makerData?.data) notFound()

	const maker = makerData.data

	return (
		<>
			<MobileDetailHeader pageTitle={maker.businessName} />
			<section className="pc:pt-[60px] pc:pb-10 pt-4">
				<MakerProfile {...maker} socialNetworkIds={maker.socialIds} inDetail />
			</section>
			<section>
				<div className="max-pc:flex-col pc:gap-10 flex">
					<ProductCategories categories={categories?.data || []} />
					<div className="grid flex-1 gap-6">
						<div className="pc:justify-end pc:gap-6 flex items-center justify-between py-6">
							<FilterSoldoutButton />
							<ProductsSortbyDropdown />
						</div>
						<ProductCardList />
					</div>
				</div>
			</section>
			<div className="h-[120px]" />
		</>
	)
}
