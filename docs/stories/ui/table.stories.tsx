import type { Meta, StoryObj } from '@storybook/react'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@design-system/ui'

const meta: Meta<typeof Table> = {
	title: 'ui/Table',
	component: Table
}

export default meta

type Story = StoryObj<typeof Table>

const invoices = [
	{
		itemName: '멋진 후드티 - 블랙',
		status: '배송중',
		totalAmount: 98000,
		orderedAt: '11.09'
	},
	{
		itemName: '러닝 삭스 세트',
		status: '배송 완료',
		totalAmount: 47500,
		orderedAt: '10.28'
	},
	{
		itemName: '루즈핏 퍼 니트',
		status: '배송 완료',
		totalAmount: 59120,
		orderedAt: '10.19'
	},
	{
		itemName: '비건레더 레이싱 자켓',
		status: '배송 완료',
		totalAmount: 108000,
		orderedAt: '09.23'
	}
]

export const Primary: Story = {
	render: (props) => (
		<Table {...props}>
			<TableCaption>총 주문 내역 4개</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">ID</TableHead>
					<TableHead>상태</TableHead>
					<TableHead>아이템</TableHead>
					<TableHead>주문일자</TableHead>
					<TableHead className="text-right">가격</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice, i) => (
					<TableRow key={i}>
						<TableCell className="font-medium">{i + 1}</TableCell>
						<TableCell>{invoice.status}</TableCell>
						<TableCell>{invoice.itemName}</TableCell>
						<TableCell>{invoice.orderedAt}</TableCell>
						<TableCell className="text-right">
							{invoice.totalAmount.toLocaleString()}원
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={4}>총 주문금액</TableCell>
					<TableCell className="text-right">
						{invoices.reduce((acc, cur) => acc + cur.totalAmount, 0).toLocaleString()}
						원
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
	name: 'Table',
	args: {
		size: 'md'
	}
}
