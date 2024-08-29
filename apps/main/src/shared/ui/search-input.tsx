'use client'
import { cn } from '@core/utils'
import { Icon } from '@design-system/icon'
import { Input } from '@design-system/ui'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Search({ autoFocus = false }) {
	const params = useSearchParams()
	const keyword = params.get('keyword') || ''
	return (
		<Input
			defaultValue={keyword}
			name="keyword"
			size="sm"
			placeholder="찾으시는 상품이 있나요?"
			className="bg-secondary pc:pl-[46px] rounded-full pl-9 text-base font-medium ring-0"
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
		/>
	)
}

export function SearchInput({ autoFocus = false }): JSX.Element {
	return (
		<Suspense>
			<form action="/search" className="relative">
				<Search
					// eslint-disable-next-line jsx-a11y/no-autofocus
					autoFocus={autoFocus}
				/>
				<Icon
					name="MagnifyingGlassIcon"
					className="max-pc:w-4 max-pc:h-4 text-secondary-foreground pc:top-[6px] absolute left-3 top-3"
				/>
			</form>
		</Suspense>
	)
}
