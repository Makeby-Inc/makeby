import { TableOfContents } from '@design-system/template'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TableOfContents> = {
	title: 'Template/TableOfContents',
	component: TableOfContents
}

export default meta

type Story = StoryObj<typeof TableOfContents>

const content = `<h1>Article</h1><h2>Abstract</h2><p>이건 초록이예요</p><h2>Introduction</h2><p>소개할게요</p><h2>Methodology</h2><p>이런 방법론이예요 </p><h3>Sample</h3><p>이게 예시예요</p><h3>Procedure</h3><p>이렇게 만들어졌어요</p><h2>Results</h2><p>결과예요</p><h2>Discussion</h2>`

export const Primary: Story = {
	render: (props) => <TableOfContents content={content} />,
	name: 'TableOfContents',
	args: {
		children: 'TableOfContents'
	}
}
