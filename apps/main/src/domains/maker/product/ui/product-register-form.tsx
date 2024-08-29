'use client'

import { type Prisma } from '@core/models'
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
import { useAction } from '@core/react'
import { useRouter } from 'next/navigation'
import { TagSection } from '#/maker/product/ui/tag-section'
import { ProductThumbnailSection } from '#/maker/product/ui/product-thumbnail-section'
import { ProductOptionSection } from '#/maker/product/ui/product-option-section'
import {
	productFormDefaultValue,
	productRegisterDto
} from '#/maker/product/model'
import { ImageUploadSection, OptionSelect, TextareaInput } from '~/shared'
import { registerProductAction } from '#/maker/product/action'

export function ProductRegisterForm({
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

	const productRegisterForm = useForm<z.infer<typeof productRegisterDto>>({
		resolver: zodResolver(productRegisterDto),
		defaultValues: productFormDefaultValue
	})

	const registerProduct = useAction(registerProductAction, {
		onSuccess: () => {
			toast({
				title: '상품 등록을 완료했어요',
				description:
					'상품 등록 후 심사 요청을 해주셔야 심사가 진행되는 점 꼭 기억해주세요!',
				variant: 'success'
			})
			productRegisterForm.reset()
			router.push('/maker/dashboard/product')
		},
		onError: () => {
			toast({
				title: '상품 등록에 실패했습니다.',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const onSubmit = (data: z.infer<typeof productRegisterDto>) => {
		registerProduct.execute(data)
	}

	return (
		<Form {...productRegisterForm}>
			<form
				onSubmit={productRegisterForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="thumbnailUrl"
					control={productRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="썸네일" label={false}>
							<ProductThumbnailSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="title"
					control={productRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="제목">
							<Input placeholder="제목을 입력해 주세요" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="categoryId"
					control={productRegisterForm.control}
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
					name="productImages"
					control={productRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="상품 이미지" label={false}>
							<ImageUploadSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="description"
					control={productRegisterForm.control}
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
					name="options"
					control={productRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="상품 옵션" label={false}>
							<ProductOptionSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="tags"
					control={productRegisterForm.control}
					render={({ field }) => (
						<FormFieldItem title="태그">
							<TagSection {...field} />
						</FormFieldItem>
					)}
				/>
				<div className="pc:mt-5 flex items-center gap-2">
					<Button type="button" variant="outline" asChild>
						<Link href="/maker/dashboard/product">취소</Link>
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={productRegisterForm.formState.isSubmitting}
					>
						등록하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
