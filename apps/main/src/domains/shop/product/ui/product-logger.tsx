'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { setRecentProductId } from '#/shop/product/action'

export function ProductLogger() {
	const { id } = useParams()

	useEffect(() => {
		setRecentProductId(id as string)
	})
	return null
}
