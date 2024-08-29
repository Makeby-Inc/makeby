'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@design-system/ui'
import { type ProductDetail } from '#/shop'
import { ReviewItem } from '#/shop/review'
import { EmptyContent } from '~/shared/ui/empty-content'

export function ProductDetailTab({ data }: { data: ProductDetail }) {
	const tabs = [
		{
			title: '상세 설명',
			content: <div>{data.description}</div>
		},
		{
			title: '상품 리뷰',
			content: (
				<div className="w-full">
					{data.reviews.length > 0 ? (
						<div className="grid gap-10">
							{data.reviews.map((review) => (
								<ReviewItem key={review.id} review={review} />
							))}
						</div>
					) : (
						<EmptyContent
							title="리뷰가 없어요"
							description={`아직 등록된 상품의 리뷰가 없습니다.\n첫 번째 리뷰를 작성해보세요!`}
							className="min-h-[150px]"
						/>
					)}
				</div>
			)
		}
	]
	const defaultTab = tabs[0]?.title

	return (
		<Tabs defaultValue={defaultTab} className="scrollbar-hide">
			<TabsList
				type="fill"
				className="bg-muted pc:h-auto rounded-md border-none p-1"
				isBorderDisabled
			>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.title}
						value={tab.title}
						className="data-[state=active]:bg-background w-full rounded-sm border-b-0 border-none !px-4 !py-2 text-sm font-medium"
					>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent
					key={tab.title}
					value={tab.title}
					className="pc:mt-10 mt-4 flex whitespace-pre-line text-pretty text-sm data-[state=inactive]:hidden"
				>
					{tab.content}
				</TabsContent>
			))}
		</Tabs>
	)
}
