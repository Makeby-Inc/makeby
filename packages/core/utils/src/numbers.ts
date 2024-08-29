/** @tossdocs-ignore */
const units = [
	'',
	'십',
	'백',
	'천',
	'만',
	'십',
	'백',
	'천',
	'억',
	'십',
	'백',
	'천',
	'조',
	'십',
	'백',
	'천',
	'경'
]

function chunk(value: number | string, byDigits: number) {
	const result: number[] = []
	const source = String(value)

	for (let end = source.length; end >= 1; end = end - byDigits) {
		const start = Math.max(end - byDigits, 0)
		const slice = source.slice(start, end)

		result.push(Number(slice))
	}

	return result
}

function createNumberFormatterBy(formatter: (num: number) => number) {
	return function formatNumber(value: number, unit: number) {
		if (unit < 1) {
			// 부동소수점 오류 때문에 unit < 1인 경우 특별 처리
			const reciprocal = 1 / unit

			return formatter(value * reciprocal) / reciprocal
		}

		return formatter(value / unit) * unit
	}
}

/**
 * 주어진 unit 단위로 value를 올림합니다.
 */

export const ceilToUnit = createNumberFormatterBy(Math.ceil)

/**
 * 주어진 unit 단위로 value를 내림합니다.
 */

export const floorToUnit = createNumberFormatterBy(Math.floor)

/**
 * 주어진 unit 단위로 value를 반올림합니다.
 */

export const roundToUnit = createNumberFormatterBy(Math.round)

/**
 * 주어진 수를 한국어 표기로 변환합니다.
 * @param value
 * @param options { floorUnit?: number; formatAllDigits?: boolean }
 * @example
 * formatToKoreanNumber(13209802); // 1,320만 9,802
 */

export function formatToKoreanNumber(
	value: number,
	options: { floorUnit?: number; formatAllDigits?: boolean } = {}
) {
	const flooredVal = floorToUnit(value, options.floorUnit || 1)

	if (flooredVal === 0) {
		return '0'
	}

	return chunk(flooredVal, 4)
		.reduce((prevFormatted, currChunkNum, index) => {
			if (currChunkNum === 0) {
				return prevFormatted
			}

			const val = options.formatAllDigits
				? formatThousands(currChunkNum)
				: commaizeNumber(currChunkNum)
			const unit = units[index * 4]

			return `${val}${unit} ${prevFormatted}`
		}, '')
		.trim()
}

/**
 * 주어진 숫자를 한국 원화 형식으로 포맷합니다.
 * @param value
 * @param options
 * @example
 *
 * function formatToKRW(
 * // 변환할 숫자
 * value: number,
 * options: {
 * // 원 앞에 공백이 들어갑니다. 단독으로 금액을 표시할 때 true로 설정합니다. (문장 안에서는 숫자와 원을 붙여 씁니다.)
 * shouldHaveSpaceBeforeWon?: boolean;
 * // 내림할 단위.
 * floorUnit?: number;
 * // 올림할 단위.
 * ceilUnit?: number;
 * // true일 경우, 모든 자릿수를 format합니다.
 * formatAllDigits?: boolean;
 * }
 * ): string;
 * formatToKRW(13209802); // '1,320만 9,802원'
 * formatToKRW(13209802, { floorUnit: 10000 }); // '1,320만원'
 * formatToKRW(13209802, { ceilUnit: 10000 }); // '1,321만원'
 * formatToKRW(13200000, { formatAllDigits: true }); // '천3백2십만원'
 */

export function formatToKRW(
	value: number,
	options: {
		// 원 앞에 공백이 들어갑니다. 단독으로 금액을 표시할 때 true로 설정합니다. (문장 안에서는 숫자와 원을 붙여 씁니다.)
		shouldHaveSpaceBeforeWon?: boolean
		// 내림할 단위.
		floorUnit?: number
		// 올림할 단위.
		ceilUnit?: number
		// true일 경우, 모든 자릿수를 format합니다.
		formatAllDigits?: boolean
	} = {}
) {
	const formattedVal = formatToKoreanNumber(value, options)

	if (options.shouldHaveSpaceBeforeWon === true) {
		return `${formattedVal} 원`
	}

	return `${formattedVal}원`
}

/**
 * 주어진 숫자를 콤마로 구분합니다.
 * @param value
 * @example
 * commaizeNumber(13209802); // => '13,209,802'
 * commaizeNumber('13209802'); // => '13,209,802'
 */

export function commaizeNumber(value: string | number) {
	// check value has only number or comma
	if (typeof value === 'string' && !/^\d+(,\d+)*$/.test(value)) {
		return '0'
	}

	if (typeof value === 'string' || typeof value === 'number') {
		const numStr = String(value)
		const decimalPointIndex = numStr.indexOf('.')
		const commaizeRegExp = /(\d)(?=(\d\d\d)+(?!\d))/g

		// get only the integer part of the number
		const integerPart =
			decimalPointIndex > -1 ? numStr.slice(0, decimalPointIndex) : numStr

		return integerPart.replace(commaizeRegExp, '$1,')
	}

	return '0'
}

export function floorAndFormatNumber(value: number) {
	return commaizeNumber(Math.floor(value))
}

export function decommaizeNumber(numStr: string) {
	return Number(numStr.replace(/,/g, ''))
}

/**
 * 전화번호를 하이픈(`-`)이 들어간 형태로 변환합니다.
 * 서울 국번인 경우(`02XXXXZZZZ`)나 10자리 전화번호인 경우(`011XXXZZZZ`) 형태에도 대응합니다.
 * @param phoneNumber
 * @example
 * formatPhoneNumber('01025560000'); // '010-2556-0000'
 * formatPhoneNumber('0215994905'); // '02-1599-4905'
 * formatPhoneNumber('0110000000'); // '011-000-0000'
 */

export function formatPhoneNumber(phoneNumber: string) {
	const isSeoulNumber = phoneNumber.startsWith('02')
	// 서울 국번(02)인 경우에만 지역번호가 2자리
	const areaCodeEndIndex = isSeoulNumber ? 2 : 3

	// 10자리 전화번호 (또는 서울인 경우, 9자리 전화번호)에 대응하기 위해서
	// [0:areaCodeEndIndex], [areaCodeEndIndex:length-4], [length-4:length] 형식으로 나누고 join
	return [
		phoneNumber.slice(0, areaCodeEndIndex),
		phoneNumber.slice(areaCodeEndIndex, phoneNumber.length - 4),
		phoneNumber.slice(phoneNumber.length - 4)
	].join('-')
}

function formatThousands(num: number) {
	const numString = String(num)
		.split('')
		.reverse()
		.map((digit, index) => {
			return digit !== '0' ? `${digit !== '1' ? digit : ''}${units[index]}` : ''
		})
		.reverse()
		.join('')
	return numString
}

/**
 * 사업자등록번호를 하이픈(`-`)이 들어간 형태로 변환합니다.
사업자등록번호는 다음과 같은 규칙을 따릅니다.
- 모든 사업자등록번호는 10자리이다.
- 사업자등록번호는 숫자만 사용할 수 있다.
- 구분자는 하이픈('-'), 3자리, 2자리, 5자리 순으로 구분한다.
- ex) 000-00-00000
  숫자가 아닌 문자가 포함되어 있거나, 10자리가 아니라면 error를 throw합니다.
 * @param businessRegistrationNumber 
 * @example 
 * formatBusinessRegistrationNumber('0000000000'); // '000-00-00000'
 */

export function formatBusinessRegistrationNumber(
	businessRegistrationNumber: string
) {
	if (businessRegistrationNumber.length !== 10) {
		throw new Error('사업자등록번호는 반드시 길이가 10 이어야 합니다.')
	}

	if (/^\d+$/.test(businessRegistrationNumber) === false) {
		throw new Error('사업자등록번호는 [0-9] 이어야 합니다.')
	}

	return businessRegistrationNumber.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
}
