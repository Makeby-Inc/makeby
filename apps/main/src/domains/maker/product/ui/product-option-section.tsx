import { Icon } from '@design-system/icon'
import { Button, type ControllerRenderProps, toast } from '@design-system/ui'
import { forwardRef } from 'react'
import { ProductOptionCard } from '#/maker/product/ui/product-option-card'
import { type OptionData } from '#/maker/product/model'

interface ProductOptionSectionProps {
	options: OptionData[]
}

export const ProductOptionSection = forwardRef<
	HTMLDivElement,
	ControllerRenderProps<ProductOptionSectionProps, 'options'>
>(({ value, onChange }, ref) => {
	const addOption = () => {
		const id = self.crypto.randomUUID()
		if (value.length >= 10) {
			toast({
				description: '옵션 추가는 최대 10개까지 가능합니다'
			})
			return
		}
		onChange([
			...value,
			{
				id,
				thumbnailUrl: '',
				title: '',
				description: '',
				price: undefined,
				stock: undefined
			}
		])
	}

	const removeOption = (id: string) => {
		onChange(value.filter((file) => file.id !== id))
	}

	return (
		<div className="grid gap-3" ref={ref}>
			{value.map((option, index) => (
				<ProductOptionCard
					key={option.id}
					data={option}
					optionLabel={`옵션 ${index + 1}`}
					isPrimary={index === 0}
					onChange={(v) => {
						onChange(value.map((data) => (data.id === v.id ? v : data)))
					}}
					onDelete={(id) => {
						removeOption(id)
					}}
				/>
			))}
			<Button
				type="button"
				variant="outline"
				className="pc:w-fit font-semibold"
				onClick={addOption}
			>
				<div className="flex items-center gap-1">
					<Icon name="PlusIcon" className="h-5 w-5" />
					옵션 추가
				</div>
			</Button>
		</div>
	)
})
ProductOptionSection.displayName = 'ProductOptionSection'
