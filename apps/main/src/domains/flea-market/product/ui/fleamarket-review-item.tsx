'use client'

import { yymmdd } from '@core/utils'
import { useState } from 'react'
import { Icon } from '@design-system/icon'
import { ProfileAvatar, ReviewImageViewer, WithDefaultImage } from '~/shared'

export interface FleamarketReviewItemProps {
	reviewerName: string
	profileImageUrl: string
	reviewImageUrls?: string[]
	reviewDate: Date
	reviewText: string
	reviewProductName: string
	reviewScore: number
}

export function FleamarketReviewItem({
	reviewerName,
	profileImageUrl,
	reviewImageUrls,
	reviewDate,
	reviewText,
	reviewProductName,
	reviewScore
}: FleamarketReviewItemProps) {
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
					imageUrl={profileImageUrl}
					name={reviewerName}
					className="h-11 w-11"
				/>
				<div>
					<div className="flex items-center gap-2 font-semibold">
						{reviewerName}
						<div className="flex items-center gap-1">
							<Icon
								name="StarIcon"
								className="text-cautionary h-[14px] w-[14px]"
								solid
							/>
							{reviewScore.toFixed(1)}
						</div>
					</div>
					<div className="text-secondary-foreground">{yymmdd(reviewDate)}</div>
				</div>
			</div>

			<div
				onClick={toggleState}
				className="flex cursor-pointer flex-col gap-4 rounded-md border p-6"
			>
				<div className="text-secondary-foreground">{reviewProductName}</div>

				{isOpen ? (
					<div className="flex flex-col gap-4">
						<ReviewImageViewer images={reviewImageUrls || []} />
						<div className="whitespace-pre-line">{reviewText}</div>
					</div>
				) : (
					<div className="flex items-start justify-between gap-6">
						<div className="line-clamp-3">{reviewText}</div>
						{reviewImageUrls?.length ? (
							<WithDefaultImage
								src={reviewImageUrls[0] || ''}
								width={60}
								height={60}
							/>
						) : null}
					</div>
				)}
			</div>
		</div>
	)
}
