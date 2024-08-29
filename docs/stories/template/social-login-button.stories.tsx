import type { Meta, StoryObj } from '@storybook/react'
import { SocialLoginButton } from '@design-system/template'

const meta: Meta<typeof SocialLoginButton> = {
	title: 'template/SocialLoginButton',
	component: SocialLoginButton
}

export default meta

type Story = StoryObj<typeof SocialLoginButton>

export const Primary: Story = {
	render: (props) => <SocialLoginButton {...props} />,
	name: 'SocialLoginButton',
	args: {
		provider: 'kakao',
		children: 'LoginButtonText'
	}
}
