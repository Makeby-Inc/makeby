'use client'

import { type Prisma } from '@core/models'
import { cn } from '@core/utils'
import { Tabs, TabsList, TabsTrigger } from '@design-system/ui'
import { useState } from 'react'
import { groupBy } from '~/shared/utils'

type PointRecordItem = Prisma.PointRecordGetPayload<{
	include: {
		productOrder: true
	}
}>

interface PointListTabsProps {
	points: PointRecordItem[]
}

export function PointListTabs({ points }: PointListTabsProps): JSX.Element {
	const [view, setView] = useState<'all' | 'earned' | 'used'>('all')
	const [records, setRecords] = useState<PointRecordItem[]>(points)
	const groupByYear = groupBy(records, (point) => point.createdAt.getFullYear())
	const groupByYearArray = Object.entries(groupByYear)

	const handleViewChange = (newValue: string) => {
		setView(newValue as 'all' | 'earned' | 'used')
		if (newValue === 'all') {
			setRecords(points)
		} else {
			setRecords(
				points.filter((point) =>
					newValue === 'earned' ? !point.isUsed : point.isUsed
				)
			)
		}
	}

	return (
		<Tabs defaultValue="all" value={view} onValueChange={handleViewChange}>
			<TabsList defaultValue="all">
				<TabsTrigger value="all">전체</TabsTrigger>
				<TabsTrigger value="earned">적립</TabsTrigger>
				<TabsTrigger value="used">사용</TabsTrigger>
			</TabsList>
			<div className="grid gap-2 py-4">
				{groupByYearArray.map(([year, pointRecords]) => (
					<div key={year}>
						<h2 className="text-muted-foreground mb-1 font-bold">{year}</h2>
						<ul className="grid gap-1">
							{pointRecords.map((r) => (
								<li key={r.id} className="flex justify-between gap-4">
									<span className="text-sm font-semibold">
										{r.createdAt.toLocaleDateString('ko-KR', {
											month: 'short',
											day: 'numeric'
										})}
									</span>
									<span className="flex-1 text-start">{r.productOrder.title}</span>
									<span className={cn('text-primary', r.isUsed && 'text-destructive')}>
										{r.isUsed ? '-' : '+'} {r.pointAmount.toLocaleString()}P
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</Tabs>
	)
}
