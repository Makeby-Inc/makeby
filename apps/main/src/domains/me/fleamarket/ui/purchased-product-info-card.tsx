'use client'

import { useAction, useDialogStore } from '@core/react'
import { commaizeNumber, timeFromPast } from '@core/utils'
import { Badge, Button } from '@design-system/ui'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
	useReviewDialogStore,
	type FleamarketProductReviewDetail
} from '#/me/fleamarket/model'
import { getReviewExistAction } from '#/me/fleamarket/action'
import {
	ProductControlPopover,
	type FleamarketProductDetail
} from '#/flea-market'
import { WithDefaultImage } from '~/shared'

export function PurchasedProductInfoCard(data: FleamarketProductDetail) {
	const { productImages, title, price, viewCount, _count, id, createdAt } = data
	const thumbnailUrl = productImages.find((image) => image.isPrimary)?.imageUrl
	const [isReviewExist, setIsReviewExist] = useState(false)
	const [currentReview, setCurrentReview] =
		useState<FleamarketProductReviewDetail | null>(null)
	const { toggleDialog } = useDialogStore()
	const { setReviewProduct, setProductReview } = useReviewDialogStore()

	const getReviewExist = useAction(getReviewExistAction, {
		onSuccess: ({ data: review }) => {
			if (review) {
				setIsReviewExist(true)
				setCurrentReview(review)
			}
		},
		onError: () => {
			setIsReviewExist(false)
		}
	})

	useEffect(() => {
		getReviewExist.execute({
			productId: id
		})
	}, [])

	const handleViewReview = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		if (!currentReview) return

		setProductReview(currentReview)
		toggleDialog('isMyReviewDetailDialogOpened')
	}

	const handleCreateReview = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setReviewProduct(data)
		toggleDialog('isReviewCreateDialogOpened')
	}

	return (
		<div className="py-4">
			<div className="pc:justify-between flex gap-4">
				<Link href={`/fleamarket/products/${id}`} className="flex flex-1 gap-4">
					<WithDefaultImage
						src={thumbnailUrl}
						alt={title}
						width={120}
						height={120}
						className="pc:w-[120px] pc:h-[120px] h-20 w-20"
					/>
					<div className="grid flex-1">
						<div className="flex flex-1 flex-col font-semibold">
							<div className="flex items-center gap-2">
								<Badge
									variant="secondary"
									className="text-foreground rounded-sm !px-2 !py-1 text-sm font-semibold"
								>
									거래 완료
								</Badge>
								<span>{title}</span>
							</div>
							<span>{commaizeNumber(Number(price))}원</span>
						</div>
						<span className="text-secondary-foreground pc:mt-auto text-sm font-medium">
							{timeFromPast(createdAt)} 전 ∙ 조회수 {viewCount} ∙ 찜 {_count.likes}
						</span>
					</div>
				</Link>
				{/* PC Only */}
				<div className="flex gap-4">
					<div className="max-pc:hidden self-center">
						{isReviewExist ? (
							<ReviewButton onClick={handleViewReview}>작성한 후기 보기</ReviewButton>
						) : (
							<ReviewButton onClick={handleCreateReview}>후기 작성하기</ReviewButton>
						)}
					</div>

					<ProductControlPopover
						productIdProps={id}
						productStatus={data.status}
						className="pc:order-3 order-2 w-fit self-start"
					/>
				</div>
			</div>
			{/* Mobile Only */}
			<div className="pc:hidden pl-[96px]">
				{isReviewExist ? (
					<ReviewButton onClick={handleViewReview}>작성한 후기 보기</ReviewButton>
				) : (
					<ReviewButton onClick={handleCreateReview}>후기 작성하기</ReviewButton>
				)}
			</div>
		</div>
	)
}

function ReviewButton({
	children,
	onClick
}: {
	children: React.ReactNode
	onClick: (e: React.MouseEvent) => void
}) {
	return (
		<Button
			variant="outline"
			size="sm"
			className="max-pc:w-full max-pc:mt-4 self-center"
			onClick={onClick}
		>
			{children}
		</Button>
	)
}
