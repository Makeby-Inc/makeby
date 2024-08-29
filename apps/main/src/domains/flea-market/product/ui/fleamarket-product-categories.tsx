'use client'
import { type ProductCategory } from '@core/models'
import { cn } from '@core/utils'
import { useFleamarketProductsStore } from '#/flea-market/product/model'

interface ProductCategoriesProps {
	categories: ProductCategory[]
}

export function FleamarketProductCategories({
	categories
}: ProductCategoriesProps): JSX.Element {
	const { categorySlug, setCategorySlug } = useFleamarketProductsStore()

	return (
		<div className="max-pc:-mx-4 pc:flex-col max-pc:border-b pc:items-start pc:w-[200px] bg-background/80 flex h-fit backdrop-blur-[5px]">
			<ProductCategoryTab
				label="전체"
				isActive={!categorySlug}
				onClick={() => {
					setCategorySlug('')
				}}
			/>
			{categories.map((category) => (
				<ProductCategoryTab
					key={category.id}
					label={category.name}
					isActive={category.slug === categorySlug}
					onClick={() => {
						setCategorySlug(category.slug)
					}}
				/>
			))}
		</div>
	)
}

interface CategoryTab {
	label: string
	isActive: boolean
	onClick: () => void
}

function ProductCategoryTab({ label, isActive, onClick }: CategoryTab) {
	return (
		<button
			type="button"
			role="tab"
			onClick={onClick}
			className={cn(
				'text-muted-foreground pc:px-0 pc:py-2.5 pc:font-medium pc:text-secondary-foreground p-4',
				isActive &&
					'max-pc:border-b-2 pc:text-black border-black font-medium text-black'
			)}
		>
			{label}
		</button>
	)
}
