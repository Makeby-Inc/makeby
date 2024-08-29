import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	Toast,
	ToastAction,
	Toaster,
	useToast
} from '@design-system/ui'

const meta: Meta<typeof Toast> = {
	title: 'ui/Toast',
	component: Toast
}

export default meta

type Story = StoryObj<typeof Toast>

export const Primary: Story = {
	render: (props) => {
		const { toast } = useToast()
		return (
			<div>
				<Button
					variant="outline"
					onClick={() => {
						toast({
							...props,
							title: 'Scheduled: Catch up ',
							description: 'Friday, February 10, 2023 at 5:57 PM',
							action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
						})
					}}
				>
					Add to calendar
				</Button>
				<Toaster />
			</div>
		)
	},
	name: 'Toast'
}
