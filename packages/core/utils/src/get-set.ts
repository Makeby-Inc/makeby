/**
 * 객체의 특정 경로에 있는 값을 반환합니다.
 * @param obj 
 * @param path 
 * @param defaultValue 
 * @example
 * get({ a: { b: 1 } }, 'a.b'); 
  get({ a: { b: 1 } }, 'a.b.c'); 
  get<boolean>({ a: { b: true } }, 'a.b.c', false); 
 * @returns 1, undefined, false
 */

export const get = <T = any>(
	obj: Record<string, any>,
	path: string,
	defaultValue?: T
): T => {
	const travel = (regexp: RegExp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce(
				(acc, key) => (acc !== null && acc !== undefined ? acc[key] : acc),
				obj
			)
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
	return (result === undefined || result === obj ? defaultValue : result) as T
}

/**
 * 객체의 특정 경로에 있는 값을 수정합니다.
 * @param obj
 * @param path
 * @param value
 * @example
 * set({ a: { b: 1 } }, 'a.b', 2); //{ a: { b: 2 } }
 */

export const set = (obj: Record<string, any>, path: string, value: any) => {
	// Regex explained: https://regexr.com/58j0k
	const pathArray = path.match(/([^[.\]])+/g)

	pathArray?.reduce((acc, key, i) => {
		if (acc[key] == null) {
			acc[key] = {}
		}
		if (i === pathArray.length - 1) {
			acc[key] = value
		}
		return acc[key]
	}, obj)

	return obj
}
