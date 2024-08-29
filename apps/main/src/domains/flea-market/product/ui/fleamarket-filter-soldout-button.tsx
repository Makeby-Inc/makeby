'use client'

import { Icon } from '@design-system/icon'
import { cn } from '@core/utils'
import { useFleamarketProductsStore } from '#/flea-market/product/model'

export function FleamarketFilterSoldoutButton() {
	const { excludeSoldout, setExcludeSoldout } = useFleamarketProductsStore()

	return (
		<button
			type="button"
			onClick={() => {
				setExcludeSoldout(!excludeSoldout)
			}}
			className={cn(
				'text-secondary-foreground flex items-center gap-1',
				excludeSoldout && 'text-primary'
			)}
		>
			<Icon name="CheckCircleIcon" solid={excludeSoldout} />
			<div className="text-secondary-foreground gap-[2px] text-sm font-medium">
				거래 완료 상품 제외
			</div>
		</button>
	)
}
