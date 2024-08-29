'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { ProductCard } from '#/shop/product/ui/product-card'
import { FleamarketProductCard } from '#/flea-market'
import {
	type MarketLikeItems,
	type FleamarketLikeItems
} from '#/me/likes/model'
import { EmptyContent } from '~/shared/ui/empty-content'

export function LikeList({
	marketProductsData,
	fleamarketProductsData
}: {
	marketProductsData: MarketLikeItems[]
	fleamarketProductsData: FleamarketLikeItems[]
}) {
	const likeListOptions = ['상품', '중고 거래']
	const [likeListTypeBy, setLikeListTypeBy] = useState(likeListOptions[0])

	return (
		<div className="pc:gap-10 flex flex-col gap-6">
			<Tabs
				defaultValue={likeListOptions[0]}
				className="bg-muted scrollbar-hide pc:w-fit rounded-sm p-1"
			>
				<TabsList className="pc:w-fit flex w-full border-none" isBorderDisabled>
					{likeListOptions.map((tab) => (
						<TabsTrigger
							key={tab}
							value={tab}
							className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 flex-1 rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
							onClick={() => {
								setLikeListTypeBy(tab)
							}}
						>
							{tab}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
			<div className="pc:grid-cols-5 pc:gap-4 no-scrollbar grid grid-cols-2 gap-2 overflow-x-auto">
				{likeListTypeBy === '상품' ? (
					<>
						{marketProductsData.map((p, index) => (
							<ProductCard key={p.id} product={p} />
						))}
						{!marketProductsData.length && (
							<EmptyContent
								title="찜한 상품이 없어요"
								description="하트 버튼을 눌러 상품을 찜해보세요"
								className="pc:col-span-5 col-span-2"
							/>
						)}
					</>
				) : (
					<>
						{fleamarketProductsData.map((p, index) => (
							<FleamarketProductCard key={p.id} product={p} />
						))}
						{!fleamarketProductsData.length && (
							<EmptyContent
								title="찜한 중고거래가 없어요"
								description="하트 버튼을 눌러 찜해보세요"
								className="pc:col-span-5 col-span-2"
							/>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default LikeList
