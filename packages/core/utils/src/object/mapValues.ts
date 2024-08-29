/**
 * 오브젝트의 값을 map 하는 유틸 함수입니다.
 * @param value
 * @param mapper
 * @example
 * mapValues({ foo: 1, bar: 2 }, x => x * 2); // { foo: 2, bar: 4 }
 */

export function mapValues<T extends Record<PropertyKey, any>, U>(
	value: T,
	mapper: (value: T[Exclude<keyof T, symbol>]) => U
): { [K in Exclude<keyof T, symbol>]: U } {
	const entries = Object.entries(value)

	return Object.fromEntries(
		entries.map(([k, v]) => {
			return [k, mapper(v)]
		})
	) as any
}
