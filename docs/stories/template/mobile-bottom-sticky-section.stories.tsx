import type { Meta, StoryObj } from '@storybook/react'
import { MobileBottomStickySection } from '@design-system/template'
import { Button } from '@design-system/ui'

const meta: Meta<typeof MobileBottomStickySection> = {
	title: 'Template/MobileBottomStickySection',
	component: MobileBottomStickySection
}

export default meta

type Story = StoryObj<typeof MobileBottomStickySection>

export const Primary: Story = {
	render: (props) => (
		<div className="h-[300px] overflow-y-scroll">
			<div className="gap-lg grid">
				<h1>모바일에서 하단에 고정되는 섹션입니다. 화면을 줄여주세요.</h1>
				<div className="gap-md grid">
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam est
						distinctio at reiciendis totam id accusantium maxime necessitatibus
						numquam ab corporis error, sed qui laudantium aliquid perspiciatis
						temporibus nam fugit!
					</div>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam est
						distinctio at reiciendis totam id accusantium maxime necessitatibus
						numquam ab corporis error, sed qui laudantium aliquid perspiciatis
						temporibus nam fugit!
					</div>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam est
						distinctio at reiciendis totam id accusantium maxime necessitatibus
						numquam ab corporis error, sed qui laudantium aliquid perspiciatis
						temporibus nam fugit!
					</div>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam est
						distinctio at reiciendis totam id accusantium maxime necessitatibus
						numquam ab corporis error, sed qui laudantium aliquid perspiciatis
						temporibus nam fugit!
					</div>
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam est
						distinctio at reiciendis totam id accusantium maxime necessitatibus
						numquam ab corporis error, sed qui laudantium aliquid perspiciatis
						temporibus nam fugit!
					</div>
				</div>
			</div>
			<MobileBottomStickySection>
				<Button className="w-full">시작하기</Button>
			</MobileBottomStickySection>
		</div>
	),
	name: 'MobileBottomStickySection'
}
