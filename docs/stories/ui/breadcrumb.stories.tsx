import type { Meta, StoryObj } from '@storybook/react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@design-system/ui'

const meta: Meta<typeof Breadcrumb> = {
	title: 'Ui/Breadcrumb',
	component: Breadcrumb
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Primary: Story = {
	render: (props) => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/components">Components</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	name: 'Breadcrumb'
}
