/** 특정 시간부터 현재까지 얼마나 지났는지를 표시하는 함수 */
export function timeFromPast(createdAt: Date) {
	const now = Date.now()
	const past = createdAt.getTime()
	const diff = now - past
	if (diff <= 1000) return '방금'
	const scaleList = ['초', '분', '시간', '일', '주', '개월', '년']
	const timeList = [
		diff / 1000,
		diff / (1000 * 60),
		diff / (1000 * 60 * 60),
		diff / (1000 * 60 * 60 * 24),
		diff / (1000 * 60 * 60 * 24 * 7),
		diff / (1000 * 60 * 60 * 24 * 30),
		diff / (1000 * 60 * 60 * 24 * 365)
	]

	const index = timeList.findIndex((time) => time < 1)
	if (index === -1) {
		return `${Math.round(timeList[timeList.length - 1] as number)}${
			scaleList[scaleList.length - 1]
		}`
	}
	return `${Math.round(timeList[index - 1] as number)}${scaleList[index - 1]}`
}
