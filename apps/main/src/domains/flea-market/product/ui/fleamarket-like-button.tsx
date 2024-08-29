'use client'

import { useAction } from '@core/react'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Button, useToast } from '@design-system/ui'
import { useCheckAuthOrRedirect } from '~/shared'
import { likeFleamarketProductAction } from '#/maker'

export interface LikeButtonProps {
	count: number
	productId: string
	isLiked?: boolean
	className?: string
}

export function FleamarketLikeButton({
	count,
	productId,
	isLiked = false
}: LikeButtonProps): JSX.Element {
	const { checkAuthOrRedirect } = useCheckAuthOrRedirect({
		nextPath: `/fleamarket/products/${productId}`
	})
	const { toast } = useToast()
	const likeActon = useAction(likeFleamarketProductAction, {
		onSuccess: ({ data }) => {
			if (data?.liked) {
				toast({
					title: '좋아요를 눌렀어요',
					description: '마이페이지에서 확인할 수 있어요'
				})
			} else {
				toast({
					title: '좋아요를 취소했어요'
				})
			}
		}
	})

	function handleClick() {
		const isAuthenticated = checkAuthOrRedirect()

		if (!isAuthenticated) return

		likeActon.execute({ productId })
	}

	return (
		<Button
			onClick={handleClick}
			size="lg"
			options="icon"
			variant="outline"
			className="shrink-0"
			disabled={likeActon.isExecuting}
		>
			<div className="flex flex-col items-center">
				<Icon
					name="HeartIcon"
					className={cn(isLiked && 'text-negative')}
					solid={isLiked}
				/>
				<span className="text-center text-xs font-normal">{count}</span>
			</div>
		</Button>
	)
}
