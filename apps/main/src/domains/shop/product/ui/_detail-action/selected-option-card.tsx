'use client'
import { cn } from '@core/utils'
import Image from 'next/image'
import { Button } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import {
	useProductSelectedOptions,
	type ProductSelectedOption
} from '#/shop/product/model'

interface SelectedOptionCardProps {
	selectedOption: ProductSelectedOption
	className?: string
}

export function SelectedOptionCard({
	selectedOption,
	className
}: SelectedOptionCardProps): JSX.Element {
	const { option, count } = selectedOption
	const { changeCount, remove } = useProductSelectedOptions()

	return (
		<div className={cn('bg-secondary flex gap-4 rounded-2xl p-4', className)}>
			<Image
				src={option.thumbnailUrl}
				width={84}
				height={84}
				alt={option.title}
				className="rounded-lg"
			/>
			<div className="grid w-full gap-4">
				<div className="flex gap-5">
					<div className="flex-1">
						<h5 className="text-sm font-semibold">{option.title}</h5>
						<p className="text-secondary-foreground text-sm">{option.description}</p>
					</div>
					<Button
						size="sm"
						options="icon"
						variant="outline"
						onClick={() => {
							remove(option.id)
						}}
					>
						<Icon name="XMarkIcon" size="sm" />
					</Button>
				</div>

				<div className="flex justify-between">
					<div className="flex items-center divide-x">
						<Button
							size="sm"
							options="icon"
							variant="outline"
							disabled={count === 1}
							onClick={() => {
								changeCount(option.id, count - 1)
							}}
						>
							<Icon name="MinusIcon" size="sm" />
						</Button>
						<div className="flex h-8 w-8 items-center justify-center  text-center text-sm font-semibold">
							{count}
						</div>
						<Button
							size="sm"
							options="icon"
							variant="outline"
							disabled={count === option.stock}
							onClick={() => {
								changeCount(option.id, count + 1)
							}}
						>
							<Icon name="PlusIcon" size="sm" />
						</Button>
					</div>

					<p className="text-lg font-bold">
						{(option.price * count).toLocaleString()}원
					</p>
				</div>
			</div>
		</div>
	)
}
