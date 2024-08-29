import type { Meta, StoryObj } from '@storybook/react'
import { Combobox } from '@design-system/ui'

const meta: Meta<typeof Combobox> = {
	title: 'ui/Combobox',
	component: Combobox
}

export default meta

type Story = StoryObj<typeof Combobox>

const DATA = [
	{
		value: 'korea',
		label: '한국'
	},
	{
		value: 'usa',
		label: '미국'
	},
	{
		value: 'japan',
		label: '일본'
	},
	{
		value: 'china',
		label: '중국'
	},
	{
		value: 'hawaii',
		label: '하와이'
	}
]
export const Primary: Story = {
	render: (props) => (
		<Combobox
			{...props}
			onValueChange={(v) => {
				console.log(v)
			}}
		/>
	),
	name: 'Combobox',
	args: {
		data: DATA,
		defaultValue: ['korea'],
		placeholder: '거주중인 국가를 선택해주세요',
		searchPlaceholder: '국가 검색',
		emptyPlaceholder: '검색 결과가 없어요...'
	}
}

export const Multiple: Story = {
	render: (props) => (
		<Combobox
			{...props}
			multiple
			onValueChange={(v) => {
				console.log(v)
			}}
		/>
	),
	name: 'Multiple',
	args: {
		data: DATA,
		defaultValue: ['korea', 'usa'],
		placeholder: '거주중인 국가를 선택해주세요',
		searchPlaceholder: '국가 검색',
		emptyPlaceholder: '검색 결과가 없어요...'
	}
}
