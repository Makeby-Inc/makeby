'use client'

import { Separator } from '@design-system/ui'
import {
	type ProductSelectableOption,
	useProductSelectedOptions
} from '#/shop/product/model'
import { SelectableOptions } from '#/shop/product/ui/_detail-action/selectable-options'
import { SelectedOptionCard } from '#/shop/product/ui/_detail-action/selected-option-card'
import { DELIVERY_COST } from '~/shared'

interface SelectedOptionsProps {
	options: ProductSelectableOption[]
}

export function SelectedOptions({
	options
}: SelectedOptionsProps): JSX.Element {
	const { selectedOptions } = useProductSelectedOptions()

	const totalProductPrice = selectedOptions.reduce(
		(total, selectedOption) =>
			total + selectedOption.option.price * selectedOption.count,
		0
	)

	return (
		<div className="grid gap-3">
			<SelectableOptions options={options} />
			<div className="grid max-h-[200px] gap-3 overflow-y-auto ">
				{selectedOptions.map((selectedOption) => (
					<SelectedOptionCard
						key={selectedOption.option.id}
						selectedOption={selectedOption}
					/>
				))}
			</div>
			{selectedOptions.length > 0 && (
				<div className="pt-6">
					<Separator />
					<div className="grid w-full gap-3 py-6 text-sm font-medium">
						<div className="flex items-center">
							<span className="flex-1">상품 금액</span>
							<span>{totalProductPrice.toLocaleString()}원</span>
						</div>

						<div className="flex items-center">
							<span className="flex-1">배송비</span>
							<span>{DELIVERY_COST.toLocaleString()}원</span>
						</div>

						<div className="flex items-center text-xl font-bold">
							<span className="flex-1">총 결제 금액</span>
							<span className="text-primary">
								{(DELIVERY_COST + totalProductPrice).toLocaleString()}원
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
