/** 알파벳 대소문자, 숫자, 특수문자를 포함한 8자 이상의 비밀번호인지 확인하는 함수 */
export function isPassword(value: string) {
	const passwordPattern =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
	return passwordPattern.test(value)
}
