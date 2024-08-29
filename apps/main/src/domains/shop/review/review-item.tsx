'use client'

import { yymmdd } from '@core/utils'
import { Separator } from '@design-system/ui'
import Image from 'next/image'
import { useState } from 'react'
import { type ReviewItem } from '#/shop/product/model/review-item'
import { ProfileAvatar } from '~/shared'
import { ReviewImageViewer } from '~/shared/ui/review-image-viewer'

export interface ReviewItemProps {
	review: ReviewItem
}

export function ReviewItem({ review }: ReviewItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const toggleState = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	return (
		<div className="flex flex-col gap-4 text-sm">
			<div className="flex items-start gap-4">
				<ProfileAvatar
					size="sm"
					imageUrl={review.user.image}
					name={review.user.name}
					className="h-11 w-11"
				/>
				<div>
					<div className="font-semibold">{review.user.name}</div>
					<div className="text-secondary-foreground">{yymmdd(review.createdAt)}</div>
				</div>
			</div>

			<button
				type="button"
				onClick={toggleState}
				className="flex flex-col gap-4 rounded-md border p-6 text-start"
			>
				<div className="text-secondary-foreground flex gap-2">
					<h5>{review.orderItem.option.title}</h5>
					<Separator orientation="vertical" className="h-4" />
					<p className="whitespace-pre-line break-keep">
						{review.orderItem.option.description}
					</p>
				</div>

				{isOpen ? (
					<div className="flex flex-col gap-4">
						<ReviewImageViewer images={review.reviewImages} />
						<p>{review.content}</p>
					</div>
				) : (
					<div className="flex items-start justify-between gap-6">
						<div className="line-clamp-3">{review.content}</div>
						{review.reviewImages.length > 0 ? (
							<Image
								src={review.reviewImages[0] || ''}
								alt="review image"
								width={60}
								height={60}
							/>
						) : null}
					</div>
				)}
			</button>
		</div>
	)
}
