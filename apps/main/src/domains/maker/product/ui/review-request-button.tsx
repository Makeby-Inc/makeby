'use client'

import { useAction } from '@core/react'
import { Button, toast } from '@design-system/ui'
import { requestProductReviewAction } from '#/maker/product/action'

interface ReviewRequestButtonProps {
	productId: string
}

export function ReviewRequestButton({ productId }: ReviewRequestButtonProps) {
	const requestProductReview = useAction(requestProductReviewAction, {
		onSuccess: () => {
			toast({
				title: '심사 요청이 완료되었습니다',
				variant: 'success'
			})
		},
		onError: () => {
			toast({
				title: '심사 요청 중 오류가 발생했습니다',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const handleRequestReview = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		requestProductReview.execute({
			productId
		})
	}

	return (
		<Button size="sm" variant="secondary" onClick={handleRequestReview}>
			심사 요청
		</Button>
	)
}
