'use client'

import { Badge, Button } from '@design-system/ui'
import { cn, commaizeNumber, timeFromPast } from '@core/utils'
import Link from 'next/link'
import { useAction, useDialogStore } from '@core/react'
import { useEffect, useState } from 'react'
import {
	type FleamarketProductDetail,
	ProductControlPopover
} from '#/flea-market'
import { WithDefaultImage } from '~/shared'
import { getReviewExistAction } from '#/me/fleamarket/action'
import {
	useReviewDialogStore,
	type FleamarketProductReviewDetail
} from '#/me/fleamarket/model'

export function SaleProductInfoCard({
	type,
	data
}: {
	type: 'FOR_SALE' | 'SOLD_OUT'
	data: FleamarketProductDetail
}) {
	const { productImages, title, price, viewCount, _count, id, createdAt } = data
	const thumbnailUrl = productImages.find((image) => image.isPrimary)?.imageUrl
	const isCompleted = type === 'SOLD_OUT'

	const [currentReview, setCurrentReview] =
		useState<FleamarketProductReviewDetail | null>(null)
	const { toggleDialog } = useDialogStore()
	const { setProductReview } = useReviewDialogStore()

	const getReviewExist = useAction(getReviewExistAction, {
		onSuccess: ({ data: fetchedReview }) => {
			if (fetchedReview) {
				setCurrentReview(fetchedReview)
			}
		},
		onError: () => {
			setCurrentReview(null)
		}
	})

	useEffect(() => {
		getReviewExist.execute({
			productId: id
		})
	}, [])

	const handleReviewDialog = (e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		if (!currentReview) return
		setProductReview(currentReview)
		toggleDialog('isReceivedReviewDialogOpened')
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
					<div className={cn('grid flex-1')}>
						<div className="flex flex-1 flex-col font-semibold">
							<div className="flex items-center gap-2">
								{isCompleted ? (
									<Badge
										variant="secondary"
										className="text-foreground rounded-sm !px-2 !py-1 text-sm font-semibold"
									>
										거래 완료
									</Badge>
								) : null}
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
					{isCompleted && currentReview ? (
						<Button
							variant="outline"
							size="sm"
							className="max-pc:hidden pc:order-2 max-pc:mt-4 order-3 h-fit self-center"
							onClick={handleReviewDialog}
						>
							받은 후기 보기
						</Button>
					) : null}
					<ProductControlPopover
						productIdProps={id}
						productStatus={data.status}
						className="pc:order-3 order-2 w-fit self-start"
					/>
				</div>
			</div>
			{/* Mobile Only */}
			{isCompleted && currentReview ? (
				<div className="pl-[96px]">
					<Button
						variant="outline"
						size="sm"
						className="pc:hidden mt-4 w-full"
						onClick={handleReviewDialog}
					>
						받은 후기 보기
					</Button>
				</div>
			) : null}
		</div>
	)
}
