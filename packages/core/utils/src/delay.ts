/**
 * 다음 동작을 딜레이하는 유틸 함수입니다.
 * @param ms 딜레이할 시간
 */
export function delay(ms: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, ms)
	})
}
