'use client'

import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogTrigger,
	Label,
	Skeleton,
	toast
} from '@design-system/ui'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type FleamarketProductDetail } from '#/flea-market/product/model'
import {
	createComplainAction,
	getFleamarketProductDetailAction
} from '#/flea-market/product/action'
import {
	OptionSelect,
	REPORT_OPTIONS,
	TextareaInput,
	WithDefaultImage,
	useCheckAuthOrRedirect
} from '~/shared'

export function ComplainDialog({ productId }: { productId: string }) {
	const [loading, setLoading] = useState(true)
	const [product, setProduct] = useState<FleamarketProductDetail | null>()
	const [complainType, setComplainType] = useState('')
	const [complainContent, setComplainContent] = useState('')

	const reportOptions = REPORT_OPTIONS.map((option) => ({
		value: option,
		label: option
	}))

	const { checkAuthOrRedirect } = useCheckAuthOrRedirect({
		nextPath: `/fleamarket/products/${productId}`
	})

	const getFleamarketProductDetail = useAction(
		getFleamarketProductDetailAction,
		{
			onSuccess: ({ data }) => {
				setProduct(data?.productDetail)
				setLoading(false)
			}
		}
	)
	const createComplain = useAction(createComplainAction, {
		onSuccess: () => {
			toast({
				title: '신고가 접수되었습니다',
				description: '신고 내용은 검토 후 조치될 예정입니다',
				variant: 'success'
			})
		}
	})

	useEffect(() => {
		getFleamarketProductDetail.execute({
			id: productId
		})
	}, [productId])

	if (!product && loading) return <Skeleton className="h-9 w-full" />
	const thumbnail = product?.productImages.find((image) => image.isPrimary)
		?.imageUrl

	const handleComplain = () => {
		const isAuthenticated = checkAuthOrRedirect()
		if (!isAuthenticated) return
	}

	const createReport = () => {
		createComplain.execute({
			fleaMarketProductId: productId,
			complaintType: complainType,
			content: complainContent
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="h-fit w-full justify-start rounded-sm !px-3 !py-2 text-sm font-medium"
					onClick={handleComplain}
				>
					신고하기
				</Button>
			</DialogTrigger>
			<DialogContent hideClose className="max-pc:max-w-[calc(100%-32px)]">
				<div className="pc:gap-8 flex flex-col gap-6">
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold">신고하기</h1>
						<DialogClose asChild>
							<button type="button">
								<Icon name="XMarkIcon" />
							</button>
						</DialogClose>
					</div>
					<ProductItem
						thumbnail={thumbnail}
						sellerName={product?.seller.name || ''}
						title={product?.title || ''}
						price={product?.price || null}
					/>
					<Label title="신고 유형">
						<OptionSelect
							placeholder="신고 유형을 선택해주세요"
							options={reportOptions}
							value={complainType}
							onChange={setComplainType}
						/>
					</Label>
					<Label title="신고 내용">
						<TextareaInput
							value={complainContent}
							onChange={setComplainContent}
							placeholder="최대한 자세하게 작성해주세요"
							maxLength={1000}
						/>
					</Label>
					<div className="flex gap-2">
						<DialogClose asChild>
							<Button
								size="lg"
								variant="outline"
								className="text-secondary-foreground"
							>
								취소
							</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								size="lg"
								className="flex-1"
								onClick={createReport}
								disabled={!complainType}
							>
								신고하기
							</Button>
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

function ProductItem({
	thumbnail,
	sellerName,
	title,
	price
}: {
	thumbnail?: string
	sellerName: string
	title: string
	price: number | null
}) {
	return (
		<div className="flex items-center gap-4 border-y py-2">
			<WithDefaultImage src={thumbnail} width={60} height={60} />
			<div className="pc:font-semibold grid gap-1 text-xs font-bold">
				<div>{sellerName}</div>
				<div>{title}</div>
				<div>{price}</div>
			</div>
		</div>
	)
}
