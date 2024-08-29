import { DELIVERY_COST } from '~/shared'

// 도서산간 지역 우편번호 범위
const remoteAreas = [
	{ start: 63002, end: 63644 },
	{ start: 63000, end: 63001 },
	{ start: 15654, end: 15654 },
	{ start: 23008, end: 23010 },
	{ start: 23100, end: 23116 },
	{ start: 23124, end: 23136 },
	{ start: 32133, end: 32133 },
	{ start: 33411, end: 33411 },
	{ start: 40200, end: 40240 },
	{ start: 52570, end: 52571 },
	{ start: 53031, end: 53033 },
	{ start: 53088, end: 53104 },
	{ start: 54000, end: 54000 },
	{ start: 56347, end: 56349 },
	{ start: 57068, end: 57069 },
	{ start: 58760, end: 58761 },
	{ start: 58800, end: 58804 },
	{ start: 58809, end: 58810 },
	{ start: 58816, end: 58818 },
	{ start: 58826, end: 58826 },
	{ start: 58832, end: 58832 },
	{ start: 58839, end: 58841 },
	{ start: 58843, end: 58866 },
	{ start: 58953, end: 58958 },
	{ start: 59102, end: 59103 },
	{ start: 59127, end: 59127 },
	{ start: 59137, end: 59145 },
	{ start: 59149, end: 59170 },
	{ start: 59421, end: 59421 },
	{ start: 59531, end: 59531 },
	{ start: 59551, end: 59551 },
	{ start: 59563, end: 59563 },
	{ start: 59568, end: 59568 },
	{ start: 59650, end: 59650 },
	{ start: 59766, end: 59766 },
	{ start: 59781, end: 59790 }
]

export const useShippingFee = (postalCode: string | undefined) => {
	const isRemoteArea = remoteAreas.some(
		({ start, end }) => Number(postalCode) >= start && Number(postalCode) <= end
	)
	return isRemoteArea ? DELIVERY_COST + 3000 : DELIVERY_COST
}
