'use client'

import { useDialogStore } from '@core/react'
import { Icon } from '@design-system/icon'
import { Dialog, DialogContent } from '@design-system/ui'
import Image from 'next/image'
import { useReviewDialogStore } from '#/me/fleamarket/model/use-review-dialog-store'
import { ProfileAvatar } from '~/shared'

export function ReceivedReviewDialog() {
	const { isReceivedReviewDialogOpened, toggleDialog } = useDialogStore()
	const { productReview } = useReviewDialogStore()

	if (!productReview) return null
	const {
		user,
		content,
		score,
		createdAt,
		fleaMarketProduct,
		reviewImages,
		id
	} = productReview

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('ko-KR', {
			dateStyle: 'short'
		})
	}

	return (
		<Dialog open={isReceivedReviewDialogOpened}>
			<DialogContent
				hideClose
				className="pc:max-w-[440px] w-full max-w-[calc(100%-32px)]"
			>
				<div className="flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<span className="text-xl font-semibold">받은 후기</span>
						<button
							type="button"
							onClick={() => toggleDialog('isReceivedReviewDialogOpened')}
						>
							<Icon name="XMarkIcon" />
						</button>
					</div>

					<div className="flex items-start gap-4">
						<ProfileAvatar
							imageUrl={user.name}
							name={user.name}
							size="xs"
							className="h-11 w-11"
						/>

						<div className="grid flex-1 gap-2">
							<div className="grid">
								<div className="flex items-center gap-2">
									<div className="text-sm font-semibold">{user.name}</div>
									<div className="flex items-center gap-1">
										<Icon
											name="StarIcon"
											className="text-cautionary h-[14px] w-[14px]"
											solid
										/>
										<span className="text-sm font-medium">{score.toFixed(1)}</span>
									</div>
								</div>
								<span className="text-secondary-foreground mt-0.5 text-xs font-medium">
									{formatDate(createdAt)}
								</span>
							</div>
							<div className="text-secondary-foreground text-sm">
								{fleaMarketProduct.title}
							</div>
							<div className="text-sm font-medium">{content}</div>
						</div>

						{reviewImages.length > 0 && (
							<Image
								src={reviewImages[0] || ''}
								alt="리뷰 이미지"
								width={60}
								height={60}
								className="self-end"
							/>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
