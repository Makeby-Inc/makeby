'use client'

import { type NonEmptyArray } from '@core/utils'
import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function MobileTab({
	data
}: {
	data:
		| {
				label: string
				href: string
		  }[]
		| NonEmptyArray<{ label: string; href: string }>
}) {
	const initialTab = data[0].label
	const currentPath = usePathname()

	return (
		<Tabs defaultValue={initialTab} className="pc:hidden scrollbar-hide">
			<TabsList>
				{data.map((tab) => (
					<TabsTrigger
						data-state={currentPath === tab.href ? 'active' : null}
						key={tab.label}
						value={tab.label}
						asChild
					>
						<Link href={tab.href}>
							<span className="py-2">{tab.label}</span>
						</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
