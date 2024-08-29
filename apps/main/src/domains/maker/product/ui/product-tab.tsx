'use client'

import { type ProductStatus } from '@core/models'
import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export function ProductTab() {
	const tabs: {
		title: string
		params: ProductStatus
	}[] = [
		{
			title: '공개된 상품',
			params: 'RELEASED'
		},
		{
			title: '제작중인 상품',
			params: 'IN_PRODUCTION'
		},
		{
			title: '심사중인 상품',
			params: 'REVIEWING'
		},
		{
			title: '심사대기 상품',
			params: 'PENDING'
		}
	]

	const searchParams = useSearchParams()
	const status = searchParams.get('status')
	const defaultTab =
		tabs.find((tab) => tab.params.toLocaleLowerCase() === status)?.title ||
		tabs[0]?.title

	return (
		<Tabs
			defaultValue={defaultTab}
			className="bg-muted scrollbar-hide max-pc:m-4 pc:w-fit rounded-sm p-1"
		>
			<TabsList className="pc:w-fit w-full border-none" isBorderDisabled>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.title}
						value={tab.title}
						className="bg-muted data-[state=active]:bg-background text-muted-foreground data-[state=active]:text-foreground h-8 w-full rounded-[7px] border-b-0 border-none !px-8 !py-2 text-sm font-medium"
						asChild
					>
						<Link
							href={`/maker/dashboard/product?status=${tab.params.toLocaleLowerCase()}`}
						>
							{tab.title}
						</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
