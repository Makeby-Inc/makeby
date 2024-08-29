import '../tailwind.css'
import { Preview } from '@storybook/react'
import {
	Title,
	Subtitle,
	Description,
	Primary,
	Controls,
	Stories
} from '@storybook/blocks'
import React from 'react'

const preview: Preview = {
	decorators: [
		(Story) => (
			<div className="flex w-full items-start gap-4 p-4">
				<Story />
			</div>
		)
	],

	parameters: {
		controls: { hideNoControlsWarning: true },
		docs: {
			page: () => (
				<>
					<Title />
					<Subtitle />
					<Description />
					<Primary />
					<Controls />
					<Stories includePrimary={false} />
				</>
			)
		},
		nextjs: {
			appDirectory: true,
			navigation: {
				pathname: '/home'
			}
		},
		options: {
			storySort: {
				order: ['Template', 'Ui']
			}
		}
	},

	argTypes: {
		asChild: {
			table: {
				disable: true
			}
		}
	},

	tags: ['autodocs']
}
export default preview
