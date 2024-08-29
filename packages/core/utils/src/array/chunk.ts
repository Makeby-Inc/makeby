/**
 * 배열을 주어진 길이보다 작은 배열들로 나눕니다.
 * @param arr  배열
 * @param size 각 배열로 나눌 요소의 갯수 
 * @example
  chunk([], 3); // --> []
  chunk([1, 2, 3], -1); // --> []
  chunk([1, 2, 3, 4, 5, 6], 3); // --> [[1, 2, 3], [4, 5, 6]]
  chunk([1, 2, 3, 4, 5, 6, 7], 2); // --> [[1, 2], [3, 4], [5, 6], [7]]
 */

export function chunk<T>(arr: T[], size: number) {
	if (size < 1) {
		return []
	}

	return arr.reduce((result, item, index) => {
		if (index % size > 0) {
			result[result.length - 1]!.push(item)
		} else {
			result.push([item])
		}
		return result
	}, [] as T[][])
}
