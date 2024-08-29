/**
 * UserAgent를 통해 모바일인지 판별하는 유틸 함수입니다.
 */

import { getOSByUserAgent } from './getOSByUserAgent'

export function isMobileWeb() {
	const userAgent = getOSByUserAgent()

	if (userAgent === 'ios' || userAgent === 'android') {
		return true
	}
	return false
}
