'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { TagInput } from '@design-system/template'
import { useState } from 'react'

const meta: Meta<typeof TagInput> = {
	title: 'Template/TagInput',
	component: TagInput
}

export default meta

type Story = StoryObj<typeof TagInput>

export const Primary: Story = {
	render: (props) => {
		const [tags, setTags] = useState<string[]>([])
		return <TagInput tagList={tags} onChange={(v) => setTags(v)} />
	},
	name: 'TagInput'
}
