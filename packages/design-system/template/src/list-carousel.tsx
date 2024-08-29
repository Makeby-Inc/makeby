'use client'

import { NonEmptyArray, cn } from '@core/utils'
import Image from 'next/image'
import { useState } from 'react'
import { PaginationButton } from './pagination-button'

interface ListCarouselProps {
	images: NonEmptyArray<string>
	className?: string
	paginationClassName?: string
}

/**
 * 대표 이미지와 이미지 리스트를 가진 캐러셀 이미지 컴포넌트입니다.
 * - 이미지가 1개인 경우에는 이미지 리스트, 페이지네이션, 페이지네이션 버튼이 표시되지 않습니다.
 * @params images 캐러셀 이미지 배열입니다. (최대 10개 제한)
 * @params className 캐러셀 이미지에 적용되는 `className`입니다.
 * @params paginationClassName 페이지네이션에 적용되는 `className`입니다.
 */
function ListCarousel({
	images,
	className,
	paginationClassName
}: ListCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const currentImage = images[currentIndex]
	const isMultipleImage = images.length > 1
	const maxImages = images.slice(0, 10)
	const totalPage = Math.min(images.length, 10)

	const handleChangePage = (type: 'prev' | 'next') => {
		type === 'prev' &&
			setCurrentIndex((currentIndex - 1 + images.length) % images.length)
		type === 'next' && setCurrentIndex((currentIndex + 1) % images.length)
	}

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="relative">
				<Image
					src={currentImage!}
					alt={currentImage!}
					width={800}
					height={800}
					className={cn(
						'aspect-square w-full rounded-xl object-cover object-center shadow-md',
						className
					)}
				/>
				{isMultipleImage && (
					<>
						<PaginationButton
							direction="left"
							className="pc:flex absolute left-4 top-1/2 hidden -translate-y-1/2"
							onClick={() => handleChangePage('prev')}
						/>
						<PaginationButton
							direction="right"
							className="pc:flex absolute right-4 top-1/2 hidden -translate-y-1/2"
							onClick={() => handleChangePage('next')}
						/>
						<Pagination
							totalPage={totalPage}
							currentPage={currentIndex + 1}
							className={paginationClassName}
						/>
					</>
				)}
			</div>

			<div className="overflow-hidden">
				<div className="scrollbar-hide pc:grid-cols-10 pc:grid flex w-full snap-x snap-mandatory items-center gap-1 overflow-x-scroll">
					{isMultipleImage &&
						maxImages.map((image, i) => (
							<CarouselImageItem
								key={image + i}
								image={image}
								isSelected={i === currentIndex}
								onClick={() => setCurrentIndex(i)}
							/>
						))}
				</div>
			</div>
		</div>
	)
}
ListCarousel.displayName = 'ListCarousel'

interface CarouselImageItemProps extends React.HTMLAttributes<HTMLDivElement> {
	image: string
	isSelected: boolean
}
/**
 * 캐러셀 이미지 리스트 아이템 컴포넌트입니다.
 * @param image 캐러셀 이미지 URL
 * @param isSelected 이미지가 선택되어 있는지 여부
 */
function CarouselImageItem({
	image,
	isSelected,
	className,
	...props
}: CarouselImageItemProps) {
	return (
		<div
			className={cn(
				'pc:w-full pc:h-full relative aspect-square h-20 w-20 shrink-0 cursor-pointer snap-center overflow-hidden',
				className
			)}
			{...props}
		>
			<Image
				src={image}
				alt={image}
				width={80}
				height={80}
				className="aspect-square h-full w-full rounded-sm object-cover shadow-md"
			/>
			<div
				className={cn(
					'bg-foreground/50 absolute left-0 top-0 h-full w-full rounded-sm',
					isSelected && 'bg-foreground/0 border-2 border-black/10 shadow-md'
				)}
			/>
		</div>
	)
}
CarouselImageItem.displayName = 'CarouselImageItem'

interface PaginationProps {
	totalPage: number
	currentPage: number
	className?: string
}
/**
 * 캐러셀의 현재 페이지를 표시하는 페이지네이션 컴포넌트입니다.
 * - 기본적으로 우측 하단 `16px`을 띄워두고 위치해있습니다.
 * - 총 이미지의 수가 1개 이하인 경우 페이지네이션이 표시되지 않습니다.
 * @param totalPage 총 페이지 수
 * @param currentPage 현재 페이지 번호
 */
function Pagination({ totalPage, currentPage, className }: PaginationProps) {
	const isSingleImage = totalPage === 1
	if (isSingleImage) return null

	return (
		<div
			className={cn(
				'bg-foreground/50 text-background pc:h-8 pc:w-[72px] pc:text-base absolute bottom-4 right-4 flex h-7 w-[60px] items-center justify-center rounded-sm text-sm font-medium',
				className
			)}
		>
			{currentPage} / {totalPage}
		</div>
	)
}
Pagination.displayName = 'ListCarouselPagination'

export { ListCarousel }
