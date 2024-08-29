import { Button } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import Link from 'next/link'
import {
	FleamarketFilterSoldoutButton,
	FleamarketProductCategories,
	FleamarketProductsList,
	FleamarketSortbyDropdown,
	TradeTypeTabs
} from '#/flea-market'
import { getProductCategoriesAction } from '~/shared/action'

export const metadata = {
	title: '중고거래'
}

export default async function FleaMarketProductsPage() {
	const categories = await getProductCategoriesAction()

	return (
		<section className="pc:py-[60px] pc:gap-10 pc:px-0 flex flex-col gap-5 py-5">
			<div className="flex items-center gap-[10px]">
				<h1 className="pc:text-4xl flex-1 text-2xl font-semibold">중고거래</h1>
				<NewPostButton className="pc:hidden" />
			</div>

			<div className="max-pc:flex-col pc:gap-10 flex">
				<div className="pc:top-[calc(68px+50px)] sticky top-[56px] z-10 flex h-fit flex-col gap-6">
					<FleamarketProductCategories categories={categories?.data || []} />
					<NewPostButton className="max-pc:hidden" />
				</div>

				<div className="flex flex-1 flex-col gap-6">
					<div className="max-pc:flex-col flex justify-between">
						<TradeTypeTabs className="my-6" />
						<div className="pc:justify-end pc:gap-6 flex items-center justify-between">
							<FleamarketFilterSoldoutButton />
							<FleamarketSortbyDropdown />
						</div>
					</div>
					<FleamarketProductsList />
				</div>
			</div>
		</section>
	)
}

function NewPostButton({ className }: { className?: string }) {
	return (
		<Button size="sm" className={className} asChild>
			<Link href="/fleamarket/products/new">
				<Icon name="PlusIcon" />
				글쓰기
			</Link>
		</Button>
	)
}
