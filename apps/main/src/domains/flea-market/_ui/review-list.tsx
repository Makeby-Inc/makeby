'use client'

import { useAction } from '@core/react'
import { Button, Skeleton } from '@design-system/ui'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
	FleamarketReviewItem,
	getSellerReviewsAction,
	type FleamarketReviewDetail,
	type FleamarketReviewItemProps
} from '#/flea-market/product'
import { EmptyContent } from '~/shared/ui/empty-content'

export function ReviewList() {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [reviewPage, setReviewPage] = useState(1) // pagination fetching page
	const [reviews, setReviews] = useState<FleamarketReviewDetail[]>([])
	const [hasMore, setHasMore] = useState(true)

	const getSellerReviews = useAction(getSellerReviewsAction, {
		onSuccess: (result) => {
			if (result.data) {
				setReviews((prev) => {
					return prev.concat(result.data || [])
				})
				setLoading(false)
				if (result.data.length < 10) {
					setHasMore(false)
				}
			}
		}
	})

	useEffect(() => {
		getSellerReviews.execute({
			sellerId: id as string,
			page: reviewPage
		})
	}, [])

	const handleMoreReviews = () => {
		setLoading(true)
		getSellerReviews.execute({
			sellerId: id as string,
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
		return (
			<div className="w-full">
				{Array.from({ length: 8 }).map((_, index) => (
					<Skeleton
						key={index}
						className="flex h-[100px] w-full flex-1 rounded-sm"
					/>
				))}
			</div>
		)
	}

	return (
		<div className="pc:p-0 w-full overflow-scroll px-4 py-6">
			{reviews.length > 0 ? (
				<div className="flex flex-col items-center justify-center gap-10">
					<div className="flex w-full shrink-0 flex-col gap-10">
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
					title="아직 받은 거래 후기가 없어요"
					description="지금 중고 상품을 거래해 보세요"
					className="min-h-[150px]"
				/>
			)}
		</div>
	)
}
