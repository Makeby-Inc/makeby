'use client'

import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { useState } from 'react'
import { ProductCarouselImages } from '~/shared'

interface ChatImageViewerProps {
	images: string[]
}

export function ChatImageViewer({ images }: ChatImageViewerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	if (images.length === 0) return null

	const isSingleImage = images.length === 1

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsModalOpen(true)
	}

	const renderImages = isSingleImage ? (
		<Image
			src={images[0] || ''}
			alt="이미지"
			width={120}
			height={160}
			className="h-full max-h-[160px] w-full max-w-[120px] rounded-lg object-cover"
		/>
	) : (
		<ImageWrapper images={images} />
	)

	return (
		<>
			<button type="button" onClick={handleClick}>
				{renderImages}
			</button>

			{isModalOpen ? (
				<div
					onClick={(e) => {
						e.stopPropagation()
					}}
					className="pc:justify-center bg-foreground/90 fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center"
				>
					<div className="max-w-[700px] ">
						<ProductCarouselImages imageUrls={images} />
					</div>
					<button
						type="button"
						onClick={() => {
							setIsModalOpen(false)
						}}
					>
						<Icon
							name="XMarkIcon"
							size="lg"
							className="max-pc:right-4 max-pc:top-4 absolute right-20 top-20 text-white"
						/>
					</button>
				</div>
			) : null}
		</>
	)
}

function ImageWrapper({ images }: { images: string[] }) {
	const isOddImageCount = images.length % 2 === 1
	return (
		<div className="bg-secondary rounded-xl p-2">
			<div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg">
				{images.map((image, index) => (
					<Image
						key={image}
						src={image}
						alt="image"
						width={200}
						height={200}
						className={cn(
							'aspect-square object-cover object-center',
							isOddImageCount && index === images.length - 1
								? 'col-span-2 aspect-[2/1] w-full '
								: undefined
						)}
					/>
				))}
			</div>
		</div>
	)
}
