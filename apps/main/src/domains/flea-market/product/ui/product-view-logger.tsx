'use client'

import { useAction } from '@core/react'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { updateProductViewCountAction } from '#/flea-market/product/action'

export function ProductViewLogger() {
	const { id } = useParams()

	const { execute } = useAction(updateProductViewCountAction)

	useEffect(() => {
		execute({ id: id as string })
	}, [id])

	return <div />
}
