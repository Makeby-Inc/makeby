import type { Meta, StoryObj } from '@storybook/react'
import {
	Result,
	ResultContent,
	ResultDescription,
	ResultFooter,
	ResultHeader,
	ResultTitle
} from '@design-system/template'
import { Icon } from '@design-system/icon'
import { Button } from '@design-system/ui'

const meta: Meta<typeof Result> = {
	title: 'Template/Result',
	component: Result
}

export default meta

type Story = StoryObj<typeof Result>

export const Primary: Story = {
	render: (props) => (
		<Result className="w-full">
			<ResultHeader>
				<Icon name="CheckCircleIcon" className="text-muted-foreground h-20 w-20" />
			</ResultHeader>
			<ResultContent>
				<ResultTitle>Title</ResultTitle>
				<ResultDescription>description</ResultDescription>
			</ResultContent>
			<ResultFooter>
				<Button>button</Button>
			</ResultFooter>
		</Result>
	),
	name: 'Result'
}
