'use client'

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext
} from '@design-system/ui'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ProductCarouselImagesProps {
	imageUrls: string[]
}

export function ProductCarouselImages({
	imageUrls
}: ProductCarouselImagesProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	return (
		<Carousel className="max-pc:-mx-4" setApi={setApi}>
			<div className="relative">
				<CarouselContent>
					{imageUrls.map((imageUrl) => (
						<CarouselItem key={imageUrl}>
							<Image
								src={imageUrl}
								alt="상품 이미지"
								width={800}
								height={800}
								className="aspect-square w-full object-cover object-center"
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 p-4">
					{Array.from({ length: count }).map((_, index) => (
						<button
							type="button"
							key={index}
							className={`h-2 w-2 rounded-full ${
								current === index + 1 ? 'bg-black' : 'bg-foreground/30'
							}`}
							onClick={() => api?.scrollTo(index)}
						/>
					))}
				</div>
			</div>
			<div className="max-pc:hidden">
				<CarouselPrevious />
				<CarouselNext />
			</div>
		</Carousel>
	)
}
