function maskAll(str: string) {
	return str.replace(/./g, '*')
}

function isKoreanName(name: string) {
	return /[가-힣]{2,}/.test(name)
}

/**
 * 개인정보보호위원회, KISA 기준으로 개인정보 (이름)를 마스킹하는 유틸입니다.
 * @param name
 * @example
 * Masker.maskName('김데브'); //김*브
 */

function maskName(name: string) {
	if (isKoreanName(name)) {
		switch (name.length) {
			case 2:
				return name.replace(/([가-힣])([가-힣]+)/, '$1*')
			default:
				return maskExceptForEdge(name, 1)
		}
	} else {
		if (name.length < 3) {
			return name
		}

		const unmaskedSideSize = name.length < 6 ? 1 : 2
		return maskExceptForEdge(name, unmaskedSideSize)
	}
}

function maskExceptForEdge(text: string, edgeSize: number) {
	return (
		text.slice(0, edgeSize) +
		text.slice(edgeSize, text.length - edgeSize).replace(/[a-zA-Z가-힇]/g, '*') +
		text.slice(text.length - edgeSize, text.length)
	)
}

function isHyphenSeparated(phoneNumber: string) {
	return /^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber)
}

function isSeoulPhoneNumber(phoneNumber: string) {
	return /^02\d+$/.test(phoneNumber)
}
/**
 * 개인정보보호위원회, KISA 기준으로 핸드폰 번호를 마스킹하는 메소드입니다.
 * @param phoneNumber
 * @example
 * Masker.maskPhoneNumber('010-1234-5678'); // 010-****-5678
 * Masker.maskPhoneNumber('01012345678'); // 010****5678
 */

function maskPhoneNumber(phoneNumber: string) {
	if (isHyphenSeparated(phoneNumber)) {
		return phoneNumber.replace(
			/^(\d{2,3})-(\d{3,4})-(\d{4})$/,
			(_, p1, p2, p3) => `${p1}-${maskAll(p2)}-${p3}`
		)
	}
	if (isSeoulPhoneNumber(phoneNumber)) {
		return phoneNumber.replace(
			/^02(\d{3,4})(\d{4})/,
			(_, p1, p2) => `02${maskAll(p1)}${p2}`
		)
	}
	return phoneNumber.replace(
		/^(\d{3})(\d{3,4})(\d{4})/,
		(_, p1, p2, p3) => `${p1}${maskAll(p2)}${p3}`
	)
}

export const Masker = {
	maskName,
	maskPhoneNumber
}
