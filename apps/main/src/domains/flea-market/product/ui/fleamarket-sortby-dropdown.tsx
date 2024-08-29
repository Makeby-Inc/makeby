'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@design-system/ui'
import { Icon } from '@design-system/icon'
import { useFleamarketProductsStore } from '#/flea-market/product/model'

export function FleamarketSortbyDropdown() {
	const { sortBy, setSortBy } = useFleamarketProductsStore()

	// const options = ['최신순', '리뷰많은순', '낮은가격순', '높은가격순']
	const options = ['최신순', '낮은가격순', '높은가격순']

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-2 text-sm font-bold outline-none"
				>
					<span>{sortBy}</span>
					<Icon name="ArrowsUpDownIcon" size="sm" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[144px]">
				<DropdownMenuGroup>
					{options.map((option) => (
						<DropdownMenuItem
							key={option}
							onClick={() => {
								setSortBy(option)
							}}
						>
							{option}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
