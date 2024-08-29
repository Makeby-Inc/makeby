'use client'

import { useState, useEffect } from 'react'

type ViewportType = 'mobile' | 'desktop'

/**
 * 브레이크 포인트를 기준으로 viewport를 반환합니다.
 * 모바일일 경우 mobile, 데스크탑일 경우 desktop을 반환합니다.
 * @param breakpoint 조정할 브레이크 포인트
 * @returns mobile | desktop
 */
export function useViewport(breakpoint: number = 1024) {
	const [viewport, setViewport] = useState<ViewportType>('mobile')
	useEffect(() => {
		function handleResize() {
			const newViewport = window.innerWidth < breakpoint ? 'mobile' : 'desktop'
			setViewport(newViewport)
		}
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return viewport
}
