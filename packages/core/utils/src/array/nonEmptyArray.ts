/**
 * 최소 한개의 요소가 있는 배열 타입입니다.
 */
export type NonEmptyArray<T> = [T, ...T[]]
