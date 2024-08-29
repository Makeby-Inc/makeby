import type { Meta, StoryObj } from '@storybook/react'
import { NumberInput } from '@design-system/template'
import { useState } from 'react'

const meta: Meta<typeof NumberInput> = {
	title: 'template/NumberInput',
	component: NumberInput
}

export default meta

type Story = StoryObj<typeof NumberInput>

export const Primary: Story = {
	render: (props) => {
		const [count, setCount] = useState(1)
		return <NumberInput {...props} value={count} onChange={(v) => setCount(v)} />
	},
	name: 'NumberInput',
	args: {
		min: 1,
		max: 10,
		step: 1
	}
}
