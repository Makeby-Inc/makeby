/* eslint-disable @typescript-eslint/no-unnecessary-condition */
export function groupBy<T, K extends PropertyKey>(
	arr: readonly T[],
	getKeyFromItem: (item: T) => K
): Record<K, T[]> {
	const result = {} as Record<K, T[]>

	for (const item of arr) {
		const key = getKeyFromItem(item)

		// eslint-disable-next-line eqeqeq
		if (result[key] == null) {
			result[key] = []
		}

		result[key].push(item)
	}

	return result
}
