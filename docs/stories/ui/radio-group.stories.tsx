import type { Meta, StoryObj } from '@storybook/react'
import { Label, RadioGroup, RadioGroupItem } from '@design-system/ui'

const meta: Meta<typeof RadioGroup> = {
	title: 'ui/RadioGroup',
	component: RadioGroup
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Primary: Story = {
	render: (props) => (
		<RadioGroup defaultValue="option-one">
			<Label
				title="리뷰이벤트 - 콜라"
				guideText="500ml 콜라가 제공됩니다."
				direction="left"
			>
				<RadioGroupItem value="option-one" id="option-one" />
			</Label>
			<Label
				title="리뷰이벤트 - 콜라"
				guideText="500ml 콜라가 제공됩니다."
				direction="left"
			>
				<RadioGroupItem value="option-two" id="option-two" />
			</Label>
		</RadioGroup>
	),
	name: 'RadioGroup'
}
