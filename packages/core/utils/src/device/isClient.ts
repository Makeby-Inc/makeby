/**
 * 현재 환경이 클라이언트인지 판별할 수 있는 유틸 함수입니다.
 */

import { isServer } from './isServer'

export function isClient() {
	return !isServer()
}
