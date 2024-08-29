/** 이메일 형식인지 확인하는 함수 */
export function isEmail(value: string) {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
	return emailPattern.test(value)
}
