/**
 * 전화번호에 반드시 -, * 등 특수문자가 없어야 함
 * @param phoneNumber 발신번호 예) 01012345678
 * @satisfies
 */
export function validatePhoneNumber(phoneNumber: string) {
	const validatePhoneNumberPattern = /^[0-9]+$/
	if (!validatePhoneNumberPattern.test(phoneNumber)) {
		throw new Error('Invalid phone number')
	}
}
