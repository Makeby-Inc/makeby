import type { Meta, StoryObj } from '@storybook/react'
import {
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@design-system/ui'

const meta: Meta<typeof HoverCard> = {
	title: 'ui/HoverCard',
	component: HoverCard
}

export default meta

type Story = StoryObj<typeof HoverCard>

export const Primary: Story = {
	render: (props) => (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link">Link to Devgate</Button>
			</HoverCardTrigger>
			<HoverCardContent>
				<div>helfejlfejle</div>
				<br />
				<div>
					스타트업을 위한 개발 파트너, 데브게이트. 최고의 IT 개발팀과 시작을
					함께하세요.
				</div>
			</HoverCardContent>
		</HoverCard>
	),
	name: 'HoverCard'
}
