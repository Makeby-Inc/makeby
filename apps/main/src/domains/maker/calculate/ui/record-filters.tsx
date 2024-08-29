'use client'

import { cn } from '@core/utils'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'
import { type ProductData } from '../../product'
import { useMyCalculateRecordsStore } from '../model/use-my-calculate-records-store'
import { MonthlyController } from './monthly-controller'

interface RecordFiltersProps {
	myProducts: ProductData[]
}

export function RecordFilters({ myProducts }: RecordFiltersProps): JSX.Element {
	const { productId, setProductId } = useMyCalculateRecordsStore()

	return (
		<div className={cn('pc:flex-row flex flex-col gap-4')}>
			<MonthlyController />
			<Select onValueChange={setProductId} value={productId ?? ''}>
				<SelectTrigger>
					<SelectValue className="pc:w-[80px]" placeholder="제품을 선택해 주세요" />
				</SelectTrigger>
				<SelectContent>
					{myProducts.map((product) => (
						<SelectItem key={product.id} value={product.id}>
							{product.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
