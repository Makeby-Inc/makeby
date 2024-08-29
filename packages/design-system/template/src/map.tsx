'use client'

import { cn } from '@core/utils'
import Script from 'next/script'
import React from 'react'

declare global {
	interface Window {
		kakao: any
	}
}

function onLoadKakaoMapApi(
	defaultValue: string = '경기도 성남시 분당구 판교역로 166'
) {
	const { kakao } = window
	kakao.maps.load(() => {
		const container = document.getElementById('map')
		const geocoder = new kakao.maps.services.Geocoder()
		geocoder.addressSearch(defaultValue, function (result: any, status: any) {
			if (status === kakao.maps.services.Status.OK) {
				const { x, y } = result[0]
				const coord = new kakao.maps.LatLng(y, x)
				const options = {
					center: coord,
					level: 3
				}
				const map = new kakao.maps.Map(container, options)
				const marker = new kakao.maps.Marker({
					map: map,
					position: coord
				})
				marker.setMap(map)
			}
		})
	})
}

interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string
}

/**
 * 카카오 지도 API를 이용한 지도 컴포넌트입니다.
 */
function Map({ value, className, ...props }: MapProps) {
	return (
		<>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
				onReady={() => onLoadKakaoMapApi(value)}
			/>
			<div
				{...props}
				id="map"
				className={cn('border-input h-[300px] w-full rounded-lg border', className)}
			/>
		</>
	)
}
Map.displayName = 'Map'

export { Map }
