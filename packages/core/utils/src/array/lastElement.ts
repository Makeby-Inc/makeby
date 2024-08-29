/**
 * 요소가 최소 1개 이상 존재하는 배열의 마지막 요소를 가져오는 함수입니다.
 * @param arr 요소가 최소 1개 이상 존재하는 배열
 */

import { NonEmptyArray } from './nonEmptyArray'

export function lastElement<T>(arr: NonEmptyArray<T>): T
export function lastElement<T>(arr: T[]): T | undefined
export function lastElement<T>(arr: T[]): T | undefined {
	return arr[arr.length - 1]
}
