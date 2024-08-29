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
import { useRouter } from 'next/navigation'
import { type z } from 'zod'
import { type ProductDetail } from '#/shop'
import { TagSection } from '#/maker/product/ui/tag-section'
import { ProductThumbnailSection } from '#/maker/product/ui/product-thumbnail-section'
import { ProductOptionSection } from '#/maker/product/ui/product-option-section'
import { productEditDto, type ProductEditDto } from '#/maker/product/model'
import { ImageUploadSection, OptionSelect, TextareaInput } from '~/shared'
import { updateProductAction } from '#/maker/product/action/update-product'

export function ProductEditForm({
	categories,
	product
}: {
	categories: Prisma.ProductCategoryGetPayload<object>[]
	product: ProductDetail
}) {
	const router = useRouter()
	const {
		thumbnailUrl,
		title,
		categoryId,
		productImages,
		description,
		options,
		tags
	} = product

	const categoryOptions = categories.map((category) => {
		return {
			label: category.name,
			value: category.id.toString()
		}
	})

	const productEditForm = useForm<z.infer<typeof productEditDto>>({
		resolver: zodResolver(productEditDto),
		defaultValues: {
			productId: product.id,
			thumbnailUrl,
			title,
			categoryId: categoryId.toString(),
			productImages,
			description,
			options: options.map((option) => option),
			tags
		} satisfies ProductEditDto
	})

	const updateProduct = useAction(updateProductAction, {
		onSuccess: () => {
			toast({
				title: '상품 정보가 수정되었습니다',
				description: '심사 요청을 해주셔야 심사가 진행되는 점 꼭 기억해주세요!',
				variant: 'success'
			})
			productEditForm.reset()
			router.push('/maker/dashboard/product')
		},
		onError: () => {
			toast({
				title: '상품 수정에 실패했습니다.',
				description: '새로고침 후 다시 시도해 주세요.',
				variant: 'destructive'
			})
		}
	})

	const onSubmit = (data: z.infer<typeof productEditDto>) => {
		updateProduct.execute(data)
	}

	return (
		<Form {...productEditForm}>
			<form
				onSubmit={productEditForm.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FormField
					name="thumbnailUrl"
					control={productEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="썸네일" label={false}>
							<ProductThumbnailSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="title"
					control={productEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="제목">
							<Input placeholder="제목을 입력해 주세요" {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="categoryId"
					control={productEditForm.control}
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
					control={productEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상품 이미지" label={false}>
							<ImageUploadSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="description"
					control={productEditForm.control}
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
					control={productEditForm.control}
					render={({ field }) => (
						<FormFieldItem title="상품 옵션" label={false}>
							<ProductOptionSection {...field} />
						</FormFieldItem>
					)}
				/>
				<FormField
					name="tags"
					control={productEditForm.control}
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
						disabled={productEditForm.formState.isSubmitting}
					>
						수정하기
					</Button>
				</div>
			</form>
		</Form>
	)
}
