/** @tossdocs-ignore */

/**
 * UserAgent를 기반으로 접속 중인 OS를 return 합니다
 * - 반환하는 값:
 * - `ios`: iOS 환경
 * - `android`: Android 환경
 * - `web`: 그 외의 브라우저 환경
 * - `false`: 그 외의 서버 환경
 */

import { isServer } from './isServer'

export function getOSByUserAgent() {
	if (isServer()) {
		return false
	}

	const isIos = window.navigator.userAgent.match(/ipad|iphone/i) !== null

	if (isIos) {
		return 'ios'
	}

	const isAndroid = window.navigator.userAgent.match(/Android/i) !== null

	if (isAndroid) {
		return 'android'
	}

	return 'web'
}
