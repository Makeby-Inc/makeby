export function addPhoneNumberHyphen(value: string) {
	let autoDashedValue = value.replace(/[^\d]/g, '')
	if (autoDashedValue.length > 7) {
		autoDashedValue = `${autoDashedValue.slice(0, 3)}-${autoDashedValue.slice(
			3,
			7
		)}-${autoDashedValue.slice(7)}`
	} else if (autoDashedValue.length > 3) {
		autoDashedValue = `${autoDashedValue.slice(0, 3)}-${autoDashedValue.slice(3)}`
	}
	return autoDashedValue
}
