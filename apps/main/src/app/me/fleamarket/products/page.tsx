import { MyFleamarketProductsCategories } from '#/me/fleamarket/ui'
import { MobileDetailHeader } from '~/shared'

export const metadata = {
	title: '내 중고 거래'
}

export default function MyFleamarketProductsPage() {
	return (
		<main className="relative">
			<MobileDetailHeader pageTitle="내 중고 거래" />
			<section className="pc:py-[60px] pc:gap-10 max-pc:px-0 flex h-screen flex-col">
				<h1 className="max-pc:hidden text-4xl font-semibold">내 중고 거래</h1>
				<div className="pc:gap-10 max-pc:flex-col flex">
					<div className="pc:top-[69px] sticky top-[57px] w-full">
						<MyFleamarketProductsCategories />
					</div>
				</div>
			</section>
		</main>
	)
}
