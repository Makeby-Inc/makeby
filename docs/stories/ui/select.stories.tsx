import type { Meta, StoryObj } from '@storybook/react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@design-system/ui'

const meta: Meta<typeof SelectTrigger> = {
	title: 'ui/Select',
	component: SelectTrigger
}

export default meta

type Story = StoryObj<typeof SelectTrigger>

export const Primary: Story = {
	render: (props) => (
		<Select>
			<SelectTrigger {...props}>
				<SelectValue placeholder="Select a fruit" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="apple">Apple</SelectItem>
				<SelectItem value="banana">Banana</SelectItem>
				<SelectItem value="blueberry">Blueberry</SelectItem>
				<SelectItem value="grapes">Grapes</SelectItem>
				<SelectItem value="pineapple">Pineapple</SelectItem>
			</SelectContent>
		</Select>
	),
	name: 'Select'
	// args: {
	//   placeholder: "Placeholder text",
	//   disabled: false,
	// },
}
