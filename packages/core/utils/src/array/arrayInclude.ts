/** Array.include를 이용할 때 type assertion 및 TypeError 없이 포함 여부를 검사할 수 있는 Array 유틸 함수입니다. 
 * @param array 일정한 type을 가진 배열
 * @param item 확인하고자 하는 item
 * @param fromIndex 포함 여부 검사를 시작할 index 

 @example
 const arr: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];
 const element: string = 'a';
 arrayIncludes(arr, element);
 */

export function arrayInclude<T>(
	array: T[] | readonly T[],
	item: unknown,
	fromIndex?: number
): item is T {
	return array.includes(item as T, fromIndex)
}
