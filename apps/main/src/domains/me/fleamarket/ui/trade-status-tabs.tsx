'use client'

import { cn } from '@core/utils'
import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { useTradeProductsStore } from '#/me/fleamarket/action/use-trade-products-store'
import { TradeStatusType } from '#/me/fleamarket/model/trade-products-filter-dto'

export function TradeStatusTabs({ className }: { className?: string }) {
	const { tradeStatusBy, setTradeStatusBy } = useTradeProductsStore()

	const tabs = [
		{
			label: '판매중',
			value: TradeStatusType.SALE
		},
		{
			label: '거래완료',
			value: TradeStatusType.SOLDOUT
		}
	]

	return (
		<div className="bg-background pc:pb-6 pc:p-0 sticky top-0 z-20 p-4 pt-6">
			<Tabs
				defaultValue={tradeStatusBy}
				className={cn('bg-muted scrollbar-hide pc:w-fit rounded-sm p-1', className)}
			>
				<TabsList className="pc:w-fit w-full border-none" isBorderDisabled>
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-4 !py-2 text-sm font-medium"
							onClick={() => setTradeStatusBy(tab.value)}
						>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</div>
	)
}
