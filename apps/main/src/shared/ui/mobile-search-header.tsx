'use client'
import { Icon } from '@design-system/icon'
import { Input } from '@design-system/ui'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function MobileSearchHeader() {
	const searchParams = useSearchParams()
	const search = searchParams.get('keyword')
	const [keyword, setKeyword] = useState(search)
	return (
		<div className="flex flex-col items-center justify-center p-4">
			{search ? (
				<div className="flex w-full items-center justify-center gap-4 px-4 py-3">
					<Icon name="ArrowLeftIcon" />
					<div className="relative flex w-full items-center justify-center">
						<Input
							value={keyword || ''}
							className="bg-secondary pl-[46px] text-sm"
							onChange={(e) => {
								setKeyword(e.target.value)
							}}
						/>
						<Icon name="MagnifyingGlassIcon" className="absolute left-3 top-3" />
					</div>
					<div className="text-secondary-foreground w-10">취소</div>
				</div>
			) : (
				<div className="px-4 py-3">
					<div className="relative flex w-full items-center justify-center">
						<Input
							placeholder="찾으시는 상품이 있나요?"
							className="bg-secondary w-full rounded-full pl-[46px]"
						/>
						<Icon name="MagnifyingGlassIcon" className="absolute left-3 top-3" />
					</div>
				</div>
			)}
		</div>
	)
}
