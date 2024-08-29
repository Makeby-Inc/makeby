'use client'

import {
	Button,
	Skeleton,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@design-system/ui'
import { useEffect, useState } from 'react'
import { useAction } from '@core/react'
import { EmptyContent } from '~/shared/ui/empty-content'
import { type FleamarketProductDetail } from '#/flea-market/product/model/fleamarket-product-detail'
import {
	FleamarketReviewItem,
	type FleamarketReviewItemProps
} from '#/flea-market/product/ui/fleamarket-review-item'
import { getSellerReviewsAction } from '#/flea-market/product/action'
import { type FleamarketReviewDetail } from '#/flea-market/product/model'

export function FleamarketProductDetailTab({
	data
}: {
	data: FleamarketProductDetail
}) {
	const [loading, setLoading] = useState(true)
	const [reviewPage, setReviewPage] = useState(1) // pagination fetching page
	const [reviews, setReviews] = useState<FleamarketReviewDetail[]>([])
	const [activeTab, setActiveTab] = useState('상세 설명')
	const [hasMore, setHasMore] = useState(true)

	const getSellerReviews = useAction(getSellerReviewsAction, {
		onSuccess: (result) => {
			if (result.data) {
				setReviews([...reviews, ...result.data])
				setLoading(false)
				if (result.data.length < 10) {
					setHasMore(false)
				}
			}
		}
	})

	useEffect(() => {
		getSellerReviews.execute({
			sellerId: data.sellerUserId,
			page: reviewPage
		})
	}, [])

	const handleMoreReviews = () => {
		setLoading(true)
		getSellerReviews.execute({
			sellerId: data.sellerUserId,
			page: reviewPage + 1
		})
		setReviewPage(reviewPage + 1)
	}

	const reviewList: FleamarketReviewItemProps[] = reviews.map((review) => {
		return {
			reviewerName: review.user.name,
			profileImageUrl: review.user.image,
			reviewImageUrls: review.reviewImages,
			reviewDate: review.createdAt,
			reviewText: review.content,
			reviewProductName: review.fleaMarketProduct.title,
			reviewScore: review.score
		}
	})

	if (loading) {
		return <Skeleton className="h-[100px] w-full rounded-sm" />
	}

	const tabs = [
		{
			title: '상세 설명',
			content: <div className="whitespace-pre-line">{data.description}</div>
		},
		{
			title: '받은 거래 후기',
			content: (
				<div className="w-full">
					{reviews.length > 0 ? (
						<div className="flex flex-col items-center justify-center gap-10">
							<div className="grid w-full shrink-0 gap-10">
								{reviewList.map((review, index) => (
									<FleamarketReviewItem key={index} {...review} />
								))}
							</div>
							{hasMore ? (
								<Button
									variant="outline"
									className="text-secondary-foreground w-fit"
									onClick={handleMoreReviews}
								>
									거래 후기 더 보기
								</Button>
							) : null}
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

	return (
		<Tabs
			defaultValue={activeTab}
			onValueChange={(value) => {
				setActiveTab(value)
			}}
			className="scrollbar-hide"
		>
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
