import type { Meta, StoryObj } from '@storybook/react'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot
} from '@design-system/ui'

const meta: Meta<typeof InputOTP> = {
	title: 'Ui/InputOTP',
	component: InputOTP
}

export default meta

type Story = StoryObj<typeof InputOTP>

export const Primary: Story = {
	render: (props) => (
		<InputOTP maxLength={6}>
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	),
	name: 'InputOTP'
}
