'use client'
import {
	Badge,
	Separator,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@design-system/ui'
import { type ProductDetail } from '#/shop/product/model/product-detail'
import { ReviewItem } from '#/shop/review/review-item'
import { EmptyContent } from '../../../../shared/ui/empty-content'
import { ProductDisclaimer } from './product-disclaimer'

interface ProductDetailTabsProps {
	reviews: ProductDetail['reviews']
	content: string
	tags: string[]
}

export function ProductDetailTabs({
	reviews,
	content,
	tags
}: ProductDetailTabsProps): JSX.Element {
	return (
		<Tabs defaultValue="info" className="scrollbar-hide">
			<TabsList className="scrollbar-hide grid w-full grid-cols-2">
				<TabsTrigger value="info">상세 설명</TabsTrigger>
				<TabsTrigger value="reviews">상품 리뷰</TabsTrigger>
			</TabsList>
			<div className="pc:py-10 py-6">
				<TabsContent value="info" className="grid gap-6">
					<p className="whitespace-pre-line break-all">{content}</p>
					<Separator />
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="bg-secondary rounded-xs px-3 py-1 text-xs font-medium"
							>
								#{tag}
							</span>
						))}
					</div>
					<Separator />
					<ProductDisclaimer />
				</TabsContent>
				<TabsContent value="reviews" className="grid gap-6">
					{reviews.map((review) => (
						<ReviewItem key={review.id} review={review} />
					))}
					{reviews.length === 0 && (
						<EmptyContent
							title="아직 작성된 리뷰가 없어요"
							description="가장 먼저 리뷰를 작성해보세요"
						/>
					)}
				</TabsContent>
			</div>
		</Tabs>
	)
}
