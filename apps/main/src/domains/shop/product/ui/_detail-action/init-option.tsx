'use client'
import { useProductSelectedOptions } from '#/shop/product/model'
import { cn } from '@core/utils'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function InitOption(): JSX.Element {
	const { reset } = useProductSelectedOptions()
	const pathName = usePathname()

	useEffect(() => {
		reset()
	}, [pathName])

	return <></>
}
