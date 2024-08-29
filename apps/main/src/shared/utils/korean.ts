export const appendSuffix = (
	word: string,
	suffixHasBatchim: string,
	suffixWithoutBatchim: string
) => {
	const lastString = word.charCodeAt(word.length - 1)
	if (lastString < 0xac00 || lastString > 0xd7a3) {
		return word
	}
	const selectedSuffix =
		(lastString - 0xac00) % 28 > 0 ? suffixHasBatchim : suffixWithoutBatchim
	return word + selectedSuffix
}
