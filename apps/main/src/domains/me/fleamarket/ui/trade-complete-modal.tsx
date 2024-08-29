'use client'

import { cn } from '@core/utils'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
	Form,
	FormField,
	FormFieldItem,
	Skeleton,
	useForm,
	useToast
} from '@design-system/ui'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from '@core/react'
import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { WithDefaultImage } from '~/shared'
import { getFleamarketProductDetailAction } from '#/flea-market/product/action/get-fleamarket-product-detail'
import { type FleamarketProductDetail } from '#/flea-market/product/model/fleamarket-product-detail'
import {
	type CompleteTradeDto,
	completeTradeDto
} from '../model/complete-trade-dto'
import { getFleamarketBuyersAction } from '../action/get-fleamarket-buyers'
import { completeTradeAction } from '../action/complete-trade'

interface TradeCompleteModalProps {
	productId: string
	triggers: React.ReactNode
}

export function TradeCompleteModal({
	productId,
	triggers
}: TradeCompleteModalProps): JSX.Element {
	const [buyers, setBuyers] = useState<
		{ id: string; name: string; image: string }[]
	>([])
	const { toast } = useToast()

	const [productDetail, setProductDetail] = useState<FleamarketProductDetail>()
	const [modalOpen, setModalOpen] = useState(false)

	const getBuyersAction = useAction(getFleamarketBuyersAction, {
		onSuccess: ({ data }) => {
			if (data) {
				setBuyers(data)
			}
		}
	})
	const getProductDetail = useAction(getFleamarketProductDetailAction, {
		onSuccess: ({ data }) => {
			if (data?.productDetail) {
				setProductDetail(data.productDetail)
				form.setValue('productTitle', data.productDetail.title)
			}
		}
	})
	const completeAction = useAction(completeTradeAction, {
		onSuccess: () => {
			toast({
				title: '거래가 완료되었습니다',
				variant: 'success'
			})

			setModalOpen(false)
		}
	})

	const form = useForm<CompleteTradeDto>({
		resolver: zodResolver(completeTradeDto),
		defaultValues: {
			productId
		}
	})

	const handleSubmit = form.handleSubmit((data) => {
		completeAction.execute(data)
	})

	useEffect(() => {
		if (productId) {
			getBuyersAction.execute({ productId })
			getProductDetail.execute({ id: productId })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId])

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{triggers}</DialogTrigger>
			<DialogContent hideClose>
				<div className="grid gap-8">
					<div className="flex flex-col items-center justify-center gap-6 text-center ">
						<Icon
							className="text-primary h-[100px] w-[100px]"
							name="CheckCircleIcon"
							solid
						/>
						<div className="">
							<h5 className="text-xl font-semibold">거래가 완료될 예정이에요!</h5>
							<p className="text-secondary-foreground font-medium">
								구매자를 선택해 주세요
							</p>
						</div>
					</div>

					{getProductDetail.isExecuting ? (
						<Skeleton className="h-60 w-full" />
					) : null}

					{productDetail ? (
						<div className="bg-secondary flex items-center gap-4 border-y p-4">
							<Image
								alt={productDetail.title}
								src={
									productDetail.productImages.find((i) => i.isPrimary)?.imageUrl ?? ''
								}
								width={60}
								height={60}
								className="object-contain object-center"
							/>
							<div className="grid gap-1 text-xs ">
								<span className="text-secondary-foreground font-semibold">
									거래한 물건
								</span>
								<span className="font-semibold">{productDetail.title}</span>
								<span className="font-semibold">
									{(productDetail.price || 0).toLocaleString()}원
								</span>
							</div>
						</div>
					) : null}

					<Form {...form}>
						<form className="grid gap-8" onSubmit={handleSubmit}>
							<FormField
								control={form.control}
								name="buyerId"
								render={({ field }) => (
									<FormFieldItem label={false} title="구매자 선택">
										{getBuyersAction.isExecuting ? (
											<ul className="grid gap-1">
												{Array.from({ length: 3 }).map((_, index) => (
													// eslint-disable-next-line react/no-array-index-key
													<Skeleton key={index} className="h-14 w-full rounded-xl" />
												))}
											</ul>
										) : null}
										<ul className="grid gap-[5px]">
											{buyers.map((buyer) => {
												const selected = buyer.id === field.value

												return (
													<button
														type="button"
														key={buyer.id}
														onClick={() => {
															if (!selected) {
																field.onChange(buyer.id)
																form.setValue('buyerName', buyer.name)
															}
														}}
														className={cn(
															'flex w-full items-center justify-between gap-6 rounded-xl border px-6 py-5 text-start',
															selected && 'bg-primary/5 border-primary border-2'
														)}
													>
														<div className="flex items-center gap-4">
															<WithDefaultImage
																className="rounded-full border"
																width={56}
																height={56}
																src={buyer.image}
															/>
															<h5>{buyer.name}</h5>
														</div>
														<div
															className={cn(
																'flex h-4 w-4 items-center justify-center rounded-full border',
																selected && 'border-primary'
															)}
														>
															{selected ? (
																<div className="bg-primary h-2 w-2 rounded-full border border-white " />
															) : null}
														</div>
													</button>
												)
											})}
										</ul>
									</FormFieldItem>
								)}
							/>

							<Button
								disabled={completeAction.isExecuting}
								type="submit"
								className="w-full"
								size="lg"
							>
								거래 완료하기
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
