'use client'

import { NonEmptyArray, cn } from '@core/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PaginationButton } from './pagination-button'

interface MobileIndicatorCarouselProps {
	images: NonEmptyArray<string>
	className?: string
}
/**
 * 모바일에서만 사용되는 인디케이터 캐러셀 컴포넌트입니다.
 * - 이미지가 1개인 경우에는 하단 인디케이터가 표시되지 않습니다.
 * @params images 캐러셀 이미지 배열입니다. (최대 10개 제한)
 * @params className 캐러셀을 감싸고 있는 레이아웃에 적용되는 `className`입니다.
 */
function IndicatorCarousel({
	images,
	className
}: MobileIndicatorCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const currentImage = images[currentIndex]
	if (!currentImage) return null
	const maxImages = images.slice(0, 10)
	const isMultipleImage = images.length > 1

	const observerRef = useRef<IntersectionObserver | null>(null) // Intersection Observer 인스턴스를 보관하는 참조
	const imagesContainerRef = useRef<HTMLDivElement>(null) // 이미지 컨테이너를 참조하는 변수
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]) // 각 이미지에 대한 참조 배열

	// 컴포넌트가 마운트될 때 Intersection Observer를 초기화합니다.
	useEffect(() => {
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// 현재 보이는 이미지에 따라 currentIndex를 업데이트합니다.
						setCurrentIndex(imageRefs.current.indexOf(entry.target as HTMLDivElement))
					}
				})
			},
			{
				root: imagesContainerRef.current,
				threshold: 0.5 // 타겟의 50%가 보일 때 호출됩니다.
			}
		)
		const currentObserver = observerRef.current

		// 각 이미지에 대한 관찰을 시작합니다.
		imageRefs.current.forEach((ref) => {
			if (ref) {
				currentObserver.observe(ref)
			}
		})

		// 컴포넌트가 언마운트되거나 이미지가 변경될 떄 관찰자를 정리합니다.
		return () => {
			imageRefs.current.forEach((ref) => {
				if (ref) {
					currentObserver.unobserve(ref)
				}
			})
		}
	}, [images.length])

	const handleChangePage = (type: 'prev' | 'next') => {
		type === 'prev' &&
			setCurrentIndex((currentIndex - 1 + images.length) % images.length)
		type === 'next' && setCurrentIndex((currentIndex + 1) % images.length)
	}

	return (
		<div
			className={cn(
				'relative flex w-full flex-col items-center justify-center gap-4',
				className
			)}
		>
			{/* 데스크탑 */}
			<Image
				src={currentImage}
				alt={currentImage}
				width={1200}
				height={840}
				className="pc:flex hidden aspect-square h-full w-full shrink-0 rounded-xl object-cover object-center"
			/>
			{/* 모바일 */}
			<div ref={imagesContainerRef} className="pc:hidden w-full overflow-hidden">
				<div className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-1 overflow-x-scroll">
					{maxImages.map((src, index) => (
						<Image
							ref={(el) => (imageRefs.current[index] = el)}
							key={index}
							src={src}
							alt={`image-${index}`}
							width={390}
							height={390}
							className="aspect-square w-full shrink-0 snap-center rounded-xl object-cover object-center"
						/>
					))}
				</div>
			</div>
			{isMultipleImage && (
				<>
					<div className="scrollbar-hide pc:grid-cols-10 pc:grid pc:w-fit flex w-full snap-x snap-mandatory items-center justify-center gap-1 overflow-x-scroll">
						{maxImages.map((_, idx) => (
							<Indicator key={idx} isSelected={idx === currentIndex} />
						))}
					</div>
					<PaginationButton
						direction="left"
						size="lg"
						className="pc:flex absolute left-4 top-1/2 hidden -translate-y-1/2"
						onClick={() => handleChangePage('prev')}
					/>
					<PaginationButton
						direction="right"
						size="lg"
						className="pc:flex absolute right-4 top-1/2 hidden -translate-y-1/2"
						onClick={() => handleChangePage('next')}
					/>
				</>
			)}
		</div>
	)
}
IndicatorCarousel.displayName = 'IndicatorCarousel'

function Indicator({
	isSelected,
	className
}: {
	isSelected: boolean
	className?: string
}) {
	return (
		<div
			className={cn(
				'bg-brand-200 h-2 w-2 rounded-full',
				isSelected && 'bg-primary h-3 w-3',
				className
			)}
		/>
	)
}

export { IndicatorCarousel }
