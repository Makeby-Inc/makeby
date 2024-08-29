'use client'

import { type Prisma } from '@core/models'
import { cn } from '@core/utils'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@design-system/ui'
import Image from 'next/image'
import Link from 'next/link'

interface MainBannerProps {
	banners: Prisma.LandingCarouselImageGetPayload<{
		select: {
			imageUrl: true
			link: true
		}
	}>[]
}
export function MainBanner({ banners }: MainBannerProps) {
	return (
		<Carousel className="pc:h-[500px] h-[240px] w-full">
			<CarouselContent>
				{banners.map(({ imageUrl, link }) => (
					<CarouselItem key={imageUrl}>
						<Link
							href={link || ''}
							target="_blank"
							aria-checked
							className={cn(!link && 'pointer-events-none')}
						>
							<Image
								src={imageUrl}
								alt="상품 이미지"
								width={800}
								height={500}
								className="pc:h-[500px] h-[240px] w-full object-cover"
							/>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="max-pc:hidden">
				<CarouselPrevious />
				<CarouselNext />
			</div>
		</Carousel>
	)
}
