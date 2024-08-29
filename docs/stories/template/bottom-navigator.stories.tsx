import type { Meta, StoryObj } from '@storybook/react'
import { BottomNavigator, BottomNavigatorMenu } from '@design-system/template'

const meta: Meta<typeof BottomNavigator> = {
	title: 'Template/BottomNavigator',
	component: BottomNavigator
}

export default meta

type Story = StoryObj<typeof BottomNavigator>

export const Primary: Story = {
	render: (props) => (
		<BottomNavigator>
			<BottomNavigatorMenu href="/" icon="MagnifyingGlassIcon" exact>
				search
			</BottomNavigatorMenu>
			<BottomNavigatorMenu href="/" icon="Squares2X2Icon" exact>
				category
			</BottomNavigatorMenu>
			<BottomNavigatorMenu href="/" icon="HomeIcon">
				home
			</BottomNavigatorMenu>
			<BottomNavigatorMenu href="/" icon="ChatBubbleBottomCenterTextIcon" exact>
				community
			</BottomNavigatorMenu>
			<BottomNavigatorMenu href="/" icon="UserIcon" exact>
				me
			</BottomNavigatorMenu>
		</BottomNavigator>
	),
	name: 'BottomNavigator'
}
