'use client'

import { type Prisma } from '@core/models'
import { useAction } from '@core/react'
import {
	Button,
	Form,
	FormField,
	FormFieldItem,
	Input,
	toast,
	useForm
} from '@design-system/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { type z } from 'zod'
import { commaizeNumber } from '@core/utils'
import { useRouter } from 'next/navigation'
import { TagSection } from '#/maker/product/ui/tag-section'
import { ImageUploadSection, OptionSelect, TextareaInput } from '~/shared'
import {
	type fleaMarketRegisterDto,
	type FleamarketProductDetail,
	fleaMarketUpdateDto,
	type FleaMarketUpdateDto
} from '#/flea-market/product/model'
import { updateFleamarketProductAction } from '#/flea-market/product/action'
import { TradeTypeSection } from '#/flea-market/product/ui/trade-type-section'

export function FleamarketEditForm({
	categories,
	product
}: {
	categories: Prisma.ProductCategoryGetPayload<object>[]
	product: FleamarketProductDetail
}) {
	const router = useRouter()
	const { title, description, productImages, tags, tradeType } = product

	const imageUrls = productImages
		.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
		.map((image) => image.imageUrl)
	const categoryId = categories
		.find((category) => category.name === product.productCategory.name)
		?.id.toString()
	const tagList = tags.map((tag) => tag.name)

	const categoryOptions = categories.map((category) => {
		return {
			label: category.name,
			value: category.id.toString()
		}
	})

	const fleamarketEditForm = useForm<z.infer<typeof fleaMarketUpdateDto>>({
		resolver: zodResolver(fleaMarketUpdateDto),
		defaultValues: {
			productId: product.id,
			productImages: imageUrls,
			title,
			tradeType,
			price: product.price,
			categoryId,
			description,
			tags: tagList
		} satisfies FleaMarketUpdateDto
	})

	const updateProduct = useAction(updateFleamarketProductAction, {
		onSuccess: () => {
			toast({
				title: '상품 정보가 수정되었어요',
				variant: 'success'
			})
			fleamarketEditForm.reset()
			router.push(`/fleamarket/products/${product.id}`)
		},
		onError: () => {
			toast({
				title: '상품 정보 수정에 실패했어요',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const isPriceInputVisible =
		fleamarketEditForm.watch('tradeType') === 'SELL' ||
		fleamarketEditForm.watch('tradeType') === 'PURCHASE'

	const onSubmit = (data: z.infer<typeof fleaMarketRegisterDto>) => {
		const isPriceFree =
			fleamarketEditForm.watch('tradeType') === 'EXCHANGE' ||
			fleamarketEditForm.watch('tradeType') === 'FREE_SHARING'
		const { price, ...dto } = data

		updateProduct.execute({
			productId: product.id,
			price: isPriceFree ? null : price,
			...dto
		})
	}

	return (
		<Form {...fleamarketEditForm}>
			<form
				onSubmit={fleamarketEditForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="productImages"
					control={fleamarketEditForm.control}
					render={({ field }) => (
						<FormFieldItem label={false}>
							<ImageUploadSection isMainImageLabelVisible {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="title"
					control={fleamarketEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="제목">
							<Input maxLength={30} placeholder="제목을 입력해 주세요" {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="grid gap-2">
					<FormField
						name="tradeType"
						control={fleamarketEditForm.control}
						render={({ field }) => (
							<FormFieldItem title="거래 방식">
								<TradeTypeSection {...field} />
							</FormFieldItem>
						)}
					/>
					{isPriceInputVisible ? (
						<FormField
							name="price"
							control={fleamarketEditForm.control}
							render={({ field }) => (
								<FormFieldItem>
									<div className="flex items-center gap-2">
										<Input
											placeholder="1,000,000"
											value={
												field.value === null ? undefined : commaizeNumber(field.value)
											}
											onChange={(e) => {
												field.onChange(Number(e.target.value.replace(/,/g, '')))
											}}
										/>
										<span className="font-medium">원</span>
									</div>
								</FormFieldItem>
							)}
						/>
					) : null}
				</div>
				<FormField
					name="categoryId"
					control={fleamarketEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상품 카테고리">
							<OptionSelect
								placeholder="카테고리를 선택해주세요"
								options={categoryOptions}
								{...field}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					name="description"
					control={fleamarketEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상세 설명">
							<TextareaInput
								placeholder={`· 상품명\n· 상품 설명\n· 가격 등`}
								{...field}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					name="tags"
					control={fleamarketEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="태그">
							<TagSection {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="pc:mt-5 flex items-center gap-2">
					<Button type="button" variant="outline" asChild>
						<Link href="/fleamarket/products">취소</Link>
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={fleamarketEditForm.formState.isSubmitting}
					>
						수정완료
					</Button>
				</div>
			</form>
		</Form>
	)
}
