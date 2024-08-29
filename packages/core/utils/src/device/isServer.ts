/**
 * 현재 환경이 서버인지 판별할 수 있는 유틸 함수입니다.
 */

declare const global: unknown

export function isServer() {
	return typeof window === 'undefined' && typeof global !== 'undefined'
}
