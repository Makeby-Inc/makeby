import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@design-system/ui'

const meta: Meta<typeof Button> = {
	title: 'ui/Button',
	component: Button,
	parameters: {
		componentSubtitle: '사용자와 상호작용하기 위해 사용되는 기본적인 버튼입니다.'
	},
	argTypes: {
		children: {
			control: 'text',
			description: '버튼에 표시할 텍스트'
		},
		variant: {},
		size: {
			description: '버튼의 크기를 설정합니다.',
			control: {
				type: 'radio'
			},
			defaultValue: 'default',
			options: ['sm', 'default', 'lg']
		}
	}
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
	render: (props) => <Button {...props} />,
	name: 'default',
	args: {
		children: 'Text'
	}
}
export const Primary: Story = {
	render: (props) => (
		<>
			<Button {...props} size="sm" />
			<Button {...props} />
			<Button {...props} size="lg" />
		</>
	),
	name: 'Primary',
	args: {
		children: 'Primary',
		variant: 'default'
	},
	parameters: {
		docs: {
			description: {
				story: 'Another description on the story, overriding the comments'
			}
		}
	}
}
