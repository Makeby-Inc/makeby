'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@design-system/ui'
import { useSellerStore } from '#/flea-market/_action'
import { ProductStatusTabs } from '#/flea-market/_ui/product-status-tabs'
import { ReviewList } from '#/flea-market/_ui/review-list'

export function SellerProfileCategories() {
	const { category, setCategory } = useSellerStore()

	const tabs = [
		{
			title: '판매중인 상품',
			content: <ProductStatusTabs />
		},
		{
			title: '받은 거래 후기',
			content: <ReviewList />
		}
	]

	return (
		<Tabs
			defaultValue={category}
			className="scrollbar-hide max-pc:flex-col pc:gap-10 pc:items-start max-pc:-mx-4 max-pc:w-[calc(100%+32px)] flex w-full"
		>
			<TabsList className="pc:w-[200px] pc:flex-col flex">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.title}
						value={tab.title}
						onClick={() => {
							setCategory(tab.title)
						}}
						className="pc:border-none pc:!px-0"
					>
						<div className="flex w-full items-start">{tab.title}</div>
					</TabsTrigger>
				))}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent
					key={tab.title}
					value={tab.title}
					className="pc:max-h-[calc(100vh-(68px+228px))] flex h-full max-h-[calc(100vh-(57px+32px+171px+41px))] flex-1 whitespace-pre-line text-sm data-[state=inactive]:hidden"
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	)
}
