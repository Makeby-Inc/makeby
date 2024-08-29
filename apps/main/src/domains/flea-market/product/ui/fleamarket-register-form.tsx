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
	fleaMarketFormDefaultValue,
	fleaMarketRegisterDto
} from '#/flea-market/product/model'
import { registerFleaMarketAction } from '#/flea-market/product/action'
import { TradeTypeSection } from '#/flea-market/product/ui/trade-type-section'

export function FleaMarketRegisterForm({
	categories
}: {
	categories: Prisma.ProductCategoryGetPayload<object>[]
}) {
	const router = useRouter()

	const categoryOptions = categories.map((category) => {
		return {
			label: category.name,
			value: category.id.toString()
		}
	})

	const fleaMarketRegisterForm = useForm<z.infer<typeof fleaMarketRegisterDto>>({
		resolver: zodResolver(fleaMarketRegisterDto),
		defaultValues: fleaMarketFormDefaultValue
	})

	const registerFleaMarket = useAction(registerFleaMarketAction, {
		onSuccess: (result) => {
			toast({
				title: '상품 등록을 완료했어요',
				variant: 'success'
			})
			fleaMarketRegisterForm.reset()
			router.push(`/fleamarket/products/${result.data?.id}`)
		},
		onError: () => {
			toast({
				title: '상품 등록에 실패했습니다.',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const isPriceInputVisible =
		fleaMarketRegisterForm.watch('tradeType') === 'SELL' ||
		fleaMarketRegisterForm.watch('tradeType') === 'PURCHASE'

	const onSubmit = (data: z.infer<typeof fleaMarketRegisterDto>) => {
		const isPriceFree =
			fleaMarketRegisterForm.watch('tradeType') === 'EXCHANGE' ||
			fleaMarketRegisterForm.watch('tradeType') === 'FREE_SHARING'
		const { price, ...dto } = data

		registerFleaMarket.execute({
			price: isPriceFree ? null : price,
			...dto
		})
	}

	return (
		<Form {...fleaMarketRegisterForm}>
			<form
				onSubmit={fleaMarketRegisterForm.handleSubmit(onSubmit)}
				className="flex flex-col gap-10"
			>
				<FormField
					name="productImages"
					control={fleaMarketRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem label={false}>
							<ImageUploadSection isMainImageLabelVisible {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="title"
					control={fleaMarketRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="제목">
							<Input maxLength={30} placeholder="제목을 입력해 주세요" {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="flex flex-col gap-2">
					<FormField
						name="tradeType"
						control={fleaMarketRegisterForm.control}
						render={({ field }) => (
							<FormFieldItem title="거래 방식">
								<TradeTypeSection {...field} />
							</FormFieldItem>
						)}
					/>
					{isPriceInputVisible ? (
						<FormField
							name="price"
							control={fleaMarketRegisterForm.control}
							render={({ field }) => (
								<FormFieldItem>
									<div className="flex items-center gap-2">
										<Input
											placeholder="1,000,000"
											value={field.value === null ? '' : commaizeNumber(field.value)}
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
					control={fleaMarketRegisterForm.control}
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
					control={fleaMarketRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="상세 설명">
							<TextareaInput
								placeholder={`· 상품명\n· 구매시기\n· 거래 시 참고할 수 있는 정보를 입력해 주세요`}
								{...field}
							/>
						</FormFieldItem>
					)}
				/>
				<FormField
					name="tags"
					control={fleaMarketRegisterForm.control}
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
						disabled={fleaMarketRegisterForm.formState.isSubmitting}
					>
						등록하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
