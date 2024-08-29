import {
	Sidebar,
	SidebarButton,
	SidebarHeader,
	SidebarNavigation
} from '@design-system/template'

interface GlobalSidebarProps {
	title: string
	data: {
		label: string
		href: string
	}[]
}

export function GlobalSidebar({ title, data }: GlobalSidebarProps) {
	return (
		<Sidebar>
			<SidebarHeader className="text-4xl font-semibold">{title}</SidebarHeader>
			<SidebarNavigation className="gap-2">
				{data.map((item) => (
					<SidebarButton key={item.href} href={item.href} className="px-0">
						{item.label}
					</SidebarButton>
				))}
			</SidebarNavigation>
		</Sidebar>
	)
}
