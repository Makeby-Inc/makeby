'use client'

import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { useState } from 'react'

export function LikeListTab() {
	const likeListOptions = ['상품', '중고 거래']
	const [likeListTypeBy, setLikeListTypeBy] = useState(likeListOptions[0])

	return (
		<Tabs
			defaultValue={likeListOptions[0]}
			className={'bg-muted scrollbar-hide pc:w-fit rounded-sm p-1'}
		>
			<TabsList className="pc:w-fit w-full border-none" isBorderDisabled>
				{likeListOptions.map((tab) => (
					<TabsTrigger
						key={tab}
						value={tab}
						className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
						onClick={() => {
							setLikeListTypeBy(tab)
						}}
					>
						{tab}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
