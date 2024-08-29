'use client'

import { Icon } from '@design-system/icon'
import { OpacityLayer } from '@design-system/ui'
import Image from 'next/image'
import { useState } from 'react'
import { ProductCarouselImages } from '~/shared/ui/product-carousel-images'

interface ReviewImageViewerProps {
	images: string[]
}

export function ReviewImageViewer({ images }: ReviewImageViewerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	if (!images.length) return null

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsModalOpen(true)
	}

	return (
		<>
			<button type="button" onClick={handleClick}>
				<div className="flex flex-col gap-4">
					<div className="flex gap-4">
						{images.slice(0, 3).map((url, index) => (
							<div key={url} className="group relative">
								<Image
									src={url}
									alt={`review image ${index}`}
									width={200}
									height={200}
								/>
								<OpacityLayer />
								{index === 2 && images.length > 2 && (
									<>
										<OpacityLayer className="bg-foreground/30 group-hover:bg-foreground/30" />
										<div className="text-background absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-3xl font-bold">
											+{images.length - 2}
										</div>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</button>

			{isModalOpen ? (
				<div
					onClick={(e) => {
						e.stopPropagation()
					}}
					className="pc:justify-center bg-foreground/90 fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center"
				>
					<div className="max-w-[700px]">
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
