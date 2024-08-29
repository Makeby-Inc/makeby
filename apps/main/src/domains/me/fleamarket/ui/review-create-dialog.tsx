'use client'

import { useAction, useDialogStore } from '@core/react'
import { commaizeNumber } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Button, Dialog, DialogContent, Label, toast } from '@design-system/ui'
import { useState } from 'react'
import { useAuth } from '@providers/auth'
import { RatingIndicator } from '#/me/fleamarket/ui/rating-indicator'
import { useReviewDialogStore } from '#/me/fleamarket/model/use-review-dialog-store'
import { createFleamarketReviewAction } from '#/me/fleamarket/action'
import { ImageUploadSection, TextareaInput, WithDefaultImage } from '~/shared'

export function ReviewCreateDialog() {
	const { session } = useAuth()
	const { isReviewCreateDialogOpened, toggleDialog } = useDialogStore()
	const { reviewProduct } = useReviewDialogStore()
	const [reviewForm, setReviewForm] = useState({
		score: 0,
		images: [],
		content: ''
	})

	const createReview = useAction(createFleamarketReviewAction, {
		onSuccess: () => {
			toast({
				title: '리뷰가 등록되었습니다.',
				variant: 'success'
			})
			toggleDialog('isReviewCreateDialogOpened')
			window.location.reload()
		},
		onError: () => {
			toast({
				title: '리뷰 등록에 실패했습니다.',
				description: '새로고침 후 다시 시도해주세요.',
				variant: 'destructive'
			})
		}
	})

	if (!reviewProduct) return null
	const { title, price, seller, productImages } = reviewProduct
	const productImage = productImages.find((image) => image.isPrimary)?.imageUrl

	const handleCreateReview = () => {
		const { score, content, images } = reviewForm
		createReview.execute({
			fleaMarketProductId: reviewProduct.id,
			score,
			content,
			reviewImages: images,
			sellerId: seller.id,
			reviewerName: session?.user.name || '',
			productTitle: title
		})
	}

	return (
		<Dialog open={isReviewCreateDialogOpened}>
			<DialogContent
				hideClose
				className="pc:max-w-[640px] w-full max-w-[calc(100%-32px)]"
			>
				<div className="pc:gap-8 flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<span className="text-xl font-semibold">
							{seller.name}님과의 거래는 어떠셨나요?
						</span>
						<button
							type="button"
							onClick={() => toggleDialog('isReviewCreateDialogOpened')}
						>
							<Icon name="XMarkIcon" />
						</button>
					</div>

					<ProductCard
						productImage={productImage}
						sellerName={seller.name}
						title={title}
						price={price || 0}
					/>

					<Label title="거래 점수">
						<RatingIndicator
							value={reviewForm.score}
							max={5}
							onChange={(v) => setReviewForm({ ...reviewForm, score: v })}
						/>
					</Label>

					<div className="grid gap-2">
						<div className="font-semibold">상품 이미지</div>
						<ImageUploadSection
							value={reviewForm.images}
							onChange={(v) => setReviewForm({ ...reviewForm, images: v })}
						/>
					</div>

					<Label title="상세 리뷰">
						<TextareaInput
							placeholder="최소 15자 이상 작성해 주세요."
							minLength={15}
							value={reviewForm.content}
							onChange={(v) => setReviewForm({ ...reviewForm, content: v })}
						/>
					</Label>

					<div className="flex gap-2">
						<Button
							size="lg"
							variant="outline"
							onClick={() => toggleDialog('isReviewCreateDialogOpened')}
						>
							취소
						</Button>
						<Button
							size="lg"
							className="flex-1"
							onClick={handleCreateReview}
							disabled={
								reviewForm.score === 0 || reviewForm.content.trim().length < 15
							}
						>
							등록하기
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function ProductCard({
	productImage,
	sellerName,
	title,
	price
}: {
	productImage: string | undefined
	sellerName: string
	title: string
	price: number
}) {
	return (
		<div className="flex items-center gap-4 border-y py-2">
			<WithDefaultImage src={productImage} alt={title} width={60} height={60} />
			<div className="grid flex-1 text-xs font-semibold">
				<span className="font-bold">{sellerName}</span>
				<span>{title}</span>
				<span className="mt-0.5">{commaizeNumber(Number(price))}원</span>
			</div>
		</div>
	)
}
