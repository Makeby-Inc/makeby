import React from 'react'
import Image from 'next/image'
import { cn } from '@core/utils'
import { skeletonShimmer } from './skeleton'

const toBase64 = (str: string) =>
	typeof window === 'undefined'
		? Buffer.from(str).toString('base64')
		: window.btoa(str)

/**
 * 플레이스홀더가 내장된 Image 컴포넌트입니다. 사용방식은 next/image 컴포넌트와 동일합니다.
 *
 * (개발자 도구 Network 탭에서 disable caching, slow 3G로 테스트해보세요.)
 */
function ImageContainer({
	width,
	height,
	className,
	...props
}: React.ComponentProps<typeof Image>) {
	return (
		<Image
			{...props}
			className={cn('h-full w-full object-cover object-center', className)}
			width={width}
			height={height}
			placeholder={`data:image/svg+xml;base64,${toBase64(
				skeletonShimmer(Number(width), Number(height))
			)}`}
		/>
	)
}

export { ImageContainer }
