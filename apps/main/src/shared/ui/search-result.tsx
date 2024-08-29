'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@design-system/ui'
import { type ProductListItem } from '#/shop/product/model/product-list-item'
import { type FleamarketProductListItem } from '#/flea-market/product/model/fleamarket-product-list-item'
import { ProductCard } from '../../domains/shop'
import { FleamarketProductCard } from '../../domains/flea-market'
import { EmptyContent } from './empty-content'

interface SearchResultProps {
	products: ProductListItem[]
	fleaMarketProducts: FleamarketProductListItem[]
}

export function SearchResult({
	products,
	fleaMarketProducts
}: SearchResultProps): JSX.Element {
	return (
		<Tabs defaultValue="shop" className="scrollbar-hide">
			<TabsList>
				<TabsTrigger value="shop">상품 {products.length}</TabsTrigger>
				<TabsTrigger value="fleamarket">
					중고거래 {fleaMarketProducts.length}
				</TabsTrigger>
			</TabsList>
			<div className="py-10">
				<TabsContent value="shop">
					<ul className="pc:gap-y-10 pc:grid-cols-5 grid grid-cols-2 gap-x-4 gap-y-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ul>
					{!products.length && (
						<EmptyContent
							title="검색 결과가 없어요"
							description="다른 검색어로 다시 시도해주세요."
						/>
					)}
				</TabsContent>
				<TabsContent value="fleamarket">
					<ul className="pc:gap-y-10 pc:grid-cols-5 grid grid-cols-2 gap-x-4 gap-y-6">
						{fleaMarketProducts.map((product) => (
							<FleamarketProductCard key={product.id} product={product} />
						))}
					</ul>
					{!fleaMarketProducts.length && (
						<EmptyContent
							title="검색 결과가 없어요"
							description="다른 검색어로 다시 시도해주세요."
						/>
					)}
				</TabsContent>
			</div>
		</Tabs>
	)
}
