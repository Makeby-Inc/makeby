/** 숫자로만 이루어져 있는지 확인하는 함수 */
export function isNumber(value: string) {
	const numberPattern = /^[0-9]*$/
	return numberPattern.test(value)
}
