'use client'

import {
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@design-system/ui'
import {
	useTradeProductsStore,
	useTradeProductsDetail
} from '#/me/fleamarket/action'
import { TradeProductsType } from '#/me/fleamarket/model'
import { MyReviewDetailDialog } from '#/me/fleamarket/ui/my-review-detail-dialog'
import { PurchasedProductInfoCard } from '#/me/fleamarket/ui/purchased-product-info-card'
import { ReviewCreateDialog } from '#/me/fleamarket/ui/review-create-dialog'
import { SaleProductInfoCard } from '#/me/fleamarket/ui/sale-product-info-card'
import { TradeStatusTabs } from '#/me/fleamarket/ui/trade-status-tabs'
import { ReceivedReviewDialog } from '#/me/fleamarket/ui/received-review-dialog'
import { EmptyContent } from '../../../../shared/ui/empty-content'

export function MyFleamarketProductsCategories() {
	const { tradeTypeBy, setTradeTypeBy } = useTradeProductsStore()
	const { products, loading } = useTradeProductsDetail()

	const isProducts = products.length > 0

	const tabs = [
		{
			label: '판매 내역',
			value: TradeProductsType.SELL,
			content: (
				<div className="pc:max-h-[calc(100vh-(69px+140px+60px))] max-h-[calc(100vh-(58px))]">
					<TradeStatusTabs />
					<div className="pc:px-0 w-full px-4">
						{loading ? (
							<div className="grid gap-4">
								{Array.from({ length: 8 }).map((_, index) => (
									<Skeleton key={index} className="h-[150px] w-full rounded-sm" />
								))}
							</div>
						) : (
							isProducts && (
								<div className="grid w-full divide-y-2 border-y-2">
									{products.map((product) => (
										<SaleProductInfoCard
											key={product.id}
											type={product.status === 'SOLD_OUT' ? 'SOLD_OUT' : 'FOR_SALE'}
											data={product}
										/>
									))}
								</div>
							)
						)}

						{!loading && !isProducts && (
							<EmptyContent title="판매하신 거래가 없어요" />
						)}
					</div>
				</div>
			)
		},
		{
			label: '구매 내역',
			value: TradeProductsType.BUY,
			content: (
				<div className="pc:max-h-[calc(100vh-(69px+140px+60px))] max-h-[calc(100vh-(58px))]">
					<div className="pc:px-0 w-full px-4">
						{loading ? (
							<div className="grid gap-4">
								{Array.from({ length: 8 }).map((_, index) => (
									<Skeleton key={index} className="h-[150px] w-full rounded-sm" />
								))}
							</div>
						) : (
							isProducts && (
								<div className="grid w-full divide-y-2 border-y-2">
									{products.map((product) => (
										<PurchasedProductInfoCard key={product.id} {...product} />
									))}
								</div>
							)
						)}

						{!loading && !isProducts && (
							<EmptyContent title="구매하신 거래가 없어요" className="h-full " />
						)}
					</div>
				</div>
			)
		}
	]

	return (
		<Tabs
			defaultValue={tradeTypeBy}
			className="scrollbar-hide max-pc:flex-col pc:gap-10 pc:items-start flex w-full"
		>
			<TabsList className="pc:w-[200px] pc:flex-col flex">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="pc:border-none pc:!px-0 data-[state=active]:text-foreground pc:!py-[10px] !p-4 font-medium"
						onClick={() => {
							setTradeTypeBy(tab.value)
						}}
					>
						<div className="flex w-full items-start">{tab.label}</div>
					</TabsTrigger>
				))}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className="flex h-full flex-1 overflow-scroll data-[state=inactive]:hidden"
				>
					<div className="w-full">{tab.content}</div>
				</TabsContent>
			))}

			<ReviewCreateDialog />
			<MyReviewDetailDialog />
			<ReceivedReviewDialog />
		</Tabs>
	)
}
