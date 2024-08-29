'use client'

import { type FleaMarketProductStatus } from '@core/models'
import { Skeleton, Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { useSellerDetail, useSellerStore } from '#/flea-market/_action'
import { FleamarketProductCard } from '#/flea-market/product'
import { fleamarketProductTabMap } from '~/shared'
import { EmptyContent } from '~/shared/ui/empty-content'

export function ProductStatusTabs() {
	const { productStatusBy, setProductStatusBy } = useSellerStore()
	const { products, productsLoading } = useSellerDetail()

	const tabs: {
		title: string
		value: FleaMarketProductStatus
	}[] = Object.entries(fleamarketProductTabMap).map(([key, label]) => ({
		title: label,
		value: key as FleaMarketProductStatus
	}))

	const isEmpty = !productsLoading && products.length === 0

	return (
		<div className="flex w-full flex-col">
			<div className="bg-background sticky top-0 z-20">
				<Tabs
					defaultValue={productStatusBy}
					className="bg-muted scrollbar-hide max-pc:m-4 pc:w-fit rounded-sm p-1"
				>
					<TabsList className="pc:w-fit w-full border-none" isBorderDisabled>
						<TabsTrigger
							value=""
							className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
							onClick={() => {
								setProductStatusBy('')
							}}
						>
							전체
						</TabsTrigger>
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.title}
								value={tab.title}
								className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
								onClick={() => {
									setProductStatusBy(tab.value)
								}}
							>
								{tab.title}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			<div className="pc:mt-10 bg-background max-pc:px-4 flex min-h-[400px] w-full overflow-scroll whitespace-pre-line text-pretty text-sm data-[state=inactive]:hidden">
				{isEmpty ? (
					<div className="w-full">
						<EmptyContent
							title="현재 표시할 상품이 없어요"
							description="다른 카테고리를 살펴보거나 검색해 보세요"
						/>
					</div>
				) : null}
				<div className="pc:grid-cols-4 pc:gap-y-10 grid h-fit grid-cols-2 gap-x-4 gap-y-6">
					{productsLoading
						? Array.from({ length: 12 }).map((_, index) => (
								<Skeleton key={index} className="h-[300px] w-full rounded" />
						  ))
						: null}
					{products.map((product) => (
						<FleamarketProductCard key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	)
}
