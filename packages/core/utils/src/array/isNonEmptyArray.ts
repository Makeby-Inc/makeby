/**
 * 배열에 요소가 존재하는지 확인하는 유틸 함수입니다.
 * @param array unknown[]
 * @returns boolean
 * @example
 * const emptyArray = [];
 * const noneEmptyArray = ['1'];
 * isEmpty(emptyArray); //true
 * isEmpty(noneEmptyArray); //false
 */

import { NonEmptyArray } from './nonEmptyArray'

export function isNonEmptyArray<T>(array: T[]): array is NonEmptyArray<T> {
	return array.length === 0
}
