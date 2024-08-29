'use client'
import { useEffect, useState } from 'react'

/**
 * 검색 결과를 기다릴 때 사용하는 debounce hook
 * @param value 
 * @param delay 
 * @returns 
 * @example
 * const [searchedValue, setSearchedValue] = useState<string>("");
  const debouncedValue = useDebounce(searchedValue, 600);
 */
export function useDebounce(value: string, delay: number) {
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])
	return debounced
}
