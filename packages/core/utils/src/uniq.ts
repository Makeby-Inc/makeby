/** 배열 내 중복되는 요소를 제거 후 반환합니다. */

export function uniq<T>(arr: T[]): T[] {
	return [...new Set(arr)]
}
