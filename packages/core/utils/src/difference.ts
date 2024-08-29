/**
 * 첫 번째 배열(`xs`)에서 두 번째 배열(`ys`)에 포함되지 않은 값들을 반환합니다.
 * @param xs
 * @param ys
 * @example difference([1, 2, 3], [1, 2]);
 * @returns [3]
 */

export function difference<T>(xs: T[], ys: T[]) {
	return differenceWith(xs, ys, (x, y) => x === y)
}

/**
 * 첫 번째 배열에서 두 번째 배열에 포함되지 않은 값들을 반환합니다. `areItemsEqual` 함수로 포함 여부를 결정합니다.
 * @param xs 
 * @param ys 
 * @param areItemsEqual 
 * @example
 * const xs = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  ];
  const ys = [{ x: 1, y: 2 }];
  differenceWith(xs, ys, (a, b) => a.x === b.x && a.y === b.y);
 * @returns [{ x: 2, y: 1 }]
 */

export function differenceWith<T>(
	xs: T[],
	ys: T[],
	areItemsEqual: (x: T, y: T) => boolean
) {
	return xs.filter((x) => !ys.some((y) => areItemsEqual(x, y)))
}
