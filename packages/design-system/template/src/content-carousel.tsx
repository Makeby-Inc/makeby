'use client'

import { NonEmptyArray, cn } from '@core/utils'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PaginationButton } from './pagination-button'

export interface ContentCarouselProps {
	contents: NonEmptyArray<{
		image: string
		content?: React.ReactNode
		link?: string
	}>
	className?: string
}

/**
 * 컨텐츠(문구)와 링크를 포함한 콘텐츠 캐러셀입니다.
 * - contents: 콘텐츠 데이터배열 (최대 20개 제한)
 *   - image: 이미지 주소
 *   - content: 컴포넌트 형태
 *   - link: 링크 주소
 * @example
 * ```tsx
 * <ContentCarousel
 *   contents={[
 *     {
 *       image: "https://picsum.photos/id/237/200/300",
 *       content: <p>Lorem ipsum dolor sit, consectetur.</p>,
 *       link: "https://devgate.kr",
 *     },
 *   ]}
 * />
 * ```
 */
function ContentCarousel({ contents, className }: ContentCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const currentContent = contents[currentIndex]
	if (!currentContent) return null
	const totalPage = Math.min(contents.length, 20)

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
	}, [contents.length])

	const handleChangePage = (type: 'prev' | 'next') => {
		type === 'prev' &&
			setCurrentIndex((currentIndex - 1 + contents.length) % contents.length)
		type === 'next' && setCurrentIndex((currentIndex + 1) % contents.length)
	}

	const handleClick = (link: string) => {
		if (!link) return
		window.open(link, '_blank')
	}

	return (
		<div className="pc:rounded-xl relative w-full overflow-hidden">
			<ContentLayer>
				<div className="flex-1">{currentContent.content}</div>
				<div className="flex items-center gap-4">
					<PaginationButton
						direction="left"
						size="sm"
						className="pc:flex hidden"
						onClick={() => handleChangePage('prev')}
					/>
					<Pagination currentPage={currentIndex + 1} totalPage={totalPage} />
					<PaginationButton
						direction="right"
						size="sm"
						className="pc:flex hidden"
						onClick={() => handleChangePage('next')}
					/>
				</div>
			</ContentLayer>
			{/* 데스크탑 */}
			<div
				className={cn('pc:flex relative hidden cursor-pointer', className)}
				onClick={() => handleClick(currentContent.link || '')}
			>
				<Image
					src={currentContent.image}
					alt={currentContent.image}
					width={1200}
					height={840}
					className="aspect-[1.5/1] h-full w-full shrink-0 object-cover object-center"
				/>
			</div>
			{/* 모바일 */}
			<div
				ref={imagesContainerRef}
				className="pc:hidden w-full overflow-hidden"
				onClick={() => handleClick(currentContent.link || '')}
			>
				<div className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-1 overflow-x-scroll">
					{contents.map((content, index) => (
						<Image
							ref={(el) => (imageRefs.current[index] = el)}
							key={index}
							src={content.image}
							alt={`image-${index}`}
							width={390}
							height={273}
							className="aspect-[1.5/1] w-full shrink-0 snap-center object-cover object-center"
						/>
					))}
				</div>
			</div>
		</div>
	)
}
ContentCarousel.displayName = 'ContentCarousel'

/**
 * 캐러셀 우측 하단에 위치하는 페이지네이션 컴포넌트입니다
 * @param totalPage 총 페이지 수
 * @param currentPage 현재 페이지 번호
 */
function Pagination({
	totalPage,
	currentPage,
	className
}: {
	totalPage: number
	currentPage: number
	className?: string
}) {
	return (
		<div
			className={cn(
				'text-background flex items-center justify-center gap-4 text-lg',
				className
			)}
		>
			<div className="pc:gap-3 pc:text-lg grid grid-cols-3 gap-2 text-sm">
				<span>{currentPage}</span>|<span>{totalPage}</span>
			</div>
		</div>
	)
}

interface ContentLayerProps {
	children: React.ReactNode
	className?: string
}
/**
 * 콘텐츠가 표시될 레이어 컴포넌트입니다. 콘텐츠 레이어의 `children`으로 콘텐츠를 넘겨주세요.
 */
function ContentLayer({ children, className }: ContentLayerProps) {
	return (
		<div
			className={cn(
				'from-foreground pc:h-[300px] pc:p-10 pc:pointer-events-auto text-background pointer-events-none absolute bottom-0 left-0 z-20 flex h-[180px] w-full items-end bg-gradient-to-t to-transparent p-4',
				className
			)}
		>
			{children}
		</div>
	)
}

export { ContentCarousel }
