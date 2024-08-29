'use client'

import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { cn } from '@core/utils'
import { useFleamarketProductsStore } from '#/flea-market/product/model'
import { tradeTypeMap } from '~/shared'

export function TradeTypeTabs({ className }: { className?: string }) {
	const { tradeTypeBy, setTradeTypeBy } = useFleamarketProductsStore()

	const tradeOptions = Object.entries(tradeTypeMap).map(([key, label]) => ({
		label,
		value: key
	}))

	const defaultTab = tradeOptions.find((tab) => tab.value === tradeTypeBy)?.value

	return (
		<Tabs
			defaultValue={defaultTab}
			className={cn('bg-muted scrollbar-hide pc:w-fit rounded-sm p-1', className)}
		>
			<TabsList className="pc:w-fit w-full border-none" isBorderDisabled>
				{tradeOptions.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
						onClick={() => {
							setTradeTypeBy(tab.value)
						}}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
