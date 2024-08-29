'use client'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger
} from '@design-system/ui'
import Image from 'next/image'
import { cn } from '@core/utils'
import { useState } from 'react'
import {
	useProductSelectedOptions,
	type ProductSelectableOption
} from '#/shop/product/model/use-product-selected-options'

interface SelectableOptionsProps {
	options: ProductSelectableOption[]
}

export function SelectableOptions({
	options
}: SelectableOptionsProps): JSX.Element {
	const [value, setValue] = useState('')

	const { add } = useProductSelectedOptions()

	function handleSelectOption(id: string) {
		const option = options.find((o) => o.id === id)
		if (!option) return

		add(option)
		setValue('')
	}

	return (
		<Select value={value} onValueChange={handleSelectOption}>
			<SelectTrigger placeholder="옵션을 선택해 주세요">
				옵션을 선택해 주세요
			</SelectTrigger>
			<SelectContent className="grid gap-1">
				{options.map((option) => {
					const isSolidOut = option.stock <= 0

					return (
						<SelectItem key={option.id} value={option.id} disabled={isSolidOut}>
							<div className="hover:bg-background flex items-center gap-4 outline-none transition-colors">
								<Image
									alt="thumbnail image"
									src={option.thumbnailUrl}
									width={40}
									height={40}
									className="aspect-square rounded-lg object-cover object-center"
								/>
								<div className={cn('flex-1')}>
									<h1 className={cn('font-medium')}>
										<span className={cn(isSolidOut && 'line-through')}>
											{option.title} ({option.price.toLocaleString()} 원)
										</span>{' '}
										{isSolidOut ? (
											<span className="text-destructive text-sm font-medium ">품절</span>
										) : null}
									</h1>
									<p className="text-secondary-foreground line-clamp-3 whitespace-pre-line text-sm">
										{option.description}
									</p>
								</div>
							</div>
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}
