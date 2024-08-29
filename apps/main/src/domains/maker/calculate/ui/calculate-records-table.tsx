'use client'
import { cn } from '@core/utils'
import {
	ScrollArea,
	ScrollBar,
	Skeleton,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow
} from '@design-system/ui'
import { useMyCalculateRecordsStore } from '../model/use-my-calculate-records-store'
import { useMyCalculateRecords } from '../model/use-my-calculate-records'
import { CalculateRecordRow } from './calculate-record-row'

export function CalculateRecordsTable(): JSX.Element {
	const { records, loading } = useMyCalculateRecords()

	return (
		<ScrollArea className={cn('')}>
			<Table className="w-[800px] overflow-x-auto">
				<TableHeader className="bg-secondary text-sm font-semibold">
					<TableRow>
						<TableCell>일자</TableCell>
						<TableCell>내용</TableCell>
						<TableCell>출금 가능 금액</TableCell>
						<TableCell>누적</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{records.map((record) => (
						<CalculateRecordRow key={record.id} record={record} />
					))}
					{loading
						? Array.from({ length: 5 }).map((_, index) => (
								// eslint-disable-next-line react/no-array-index-key
								<TableRow key={index}>
									<TableCell colSpan={4}>
										<Skeleton className="h-10 w-full rounded" />
									</TableCell>
								</TableRow>
						  ))
						: null}
				</TableBody>
			</Table>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
