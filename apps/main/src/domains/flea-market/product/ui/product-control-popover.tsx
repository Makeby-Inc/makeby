'use client'

import { type FleaMarketProductStatus } from '@core/models'
import { useAction } from '@core/react'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	toast
} from '@design-system/ui'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TradeCompleteModal } from '#/me/fleamarket/ui/trade-complete-modal'
import { ComplainDialog } from '#/flea-market/product/ui/complain-dialog'
import {
	deleteProductAction,
	isMyProductAction,
	updateProductStatusAction
} from '#/flea-market/product/action'
import { fleamarketProductStatusMap } from '~/shared'
import { appendSuffix } from '~/shared/utils/korean'

export function ProductControlPopover({
	productStatus,
	productIdProps,
	className
}: {
	productStatus: FleaMarketProductStatus
	productIdProps?: string
	className?: string
}) {
	const { id } = useParams()
	const router = useRouter()
	const [isOwnProduct, setIsOwnProduct] = useState(false)

	const productId = (id || productIdProps) as string

	const isMyProduct = useAction(isMyProductAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setIsOwnProduct(data.product)
			}
		}
	})

	const updateProductStatus = useAction(updateProductStatusAction, {
		onSuccess: ({ input }) => {
			toast({
				title: `${appendSuffix(
					fleamarketProductStatusMap[input.status],
					'으로',
					'로'
				)} 변경되었습니다`,
				variant: 'success'
			})
			window.location.reload()
		},
		onError: () => {
			toast({
				title: '상태 변경 실패',
				description: '잠시 후 다시 시도해주세요',
				variant: 'destructive'
			})
		}
	})

	const deleteProduct = useAction(deleteProductAction, {
		onSuccess: () => {
			router.push('/fleamarket/products')
		},
		onError: () => {
			toast({
				title: '거래글 삭제 실패',
				description: '잠시 후 다시 시도해주세요',
				variant: 'destructive'
			})
		}
	})

	useEffect(() => {
		isMyProduct.execute({
			productId
		})
	}, [])

	const switchProductStatus = (status: FleaMarketProductStatus) => {
		updateProductStatus.execute({
			productId,
			status
		})
	}

	const handleDelete = () => {
		const confirmed = confirm('정말 삭제하시겠습니까?')
		if (confirmed) {
			deleteProduct.execute({
				productId
			})
		}
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button type="button" className={className}>
					<Icon name="EllipsisVerticalIcon" />
				</button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-[150px] !gap-0 rounded-sm !p-1">
				{isOwnProduct ? (
					<>
						{productStatus !== 'RESERVED' && (
							<OptionItem
								onClick={() => {
									switchProductStatus('RESERVED')
								}}
							>
								예약중
							</OptionItem>
						)}
						{productStatus !== 'FOR_SALE' && (
							<OptionItem
								onClick={() => {
									switchProductStatus('FOR_SALE')
								}}
							>
								거래 가능
							</OptionItem>
						)}
						{productStatus !== 'SOLD_OUT' && (
							<TradeCompleteModal
								triggers={<OptionItem>거래완료</OptionItem>}
								productId={productId}
							/>
						)}
						<OptionItem asChild>
							<Link href={`/fleamarket/products/edit/${id}`}>수정하기</Link>
						</OptionItem>
						<OptionItem onClick={handleDelete}>삭제하기</OptionItem>
					</>
				) : (
					<ComplainDialog productId={productId} />
				)}
			</PopoverContent>
		</Popover>
	)
}

interface OptionItemProps extends React.HTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	asChild?: boolean
}

function OptionItem({
	children,
	className,
	asChild,
	...props
}: OptionItemProps) {
	return (
		<Button
			variant="ghost"
			className={cn(
				'h-fit w-full justify-start rounded-sm !px-3 !py-2 text-sm font-medium',
				className
			)}
			asChild={asChild}
			{...props}
		>
			{children}
		</Button>
	)
}
