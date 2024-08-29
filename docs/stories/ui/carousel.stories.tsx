import type { Meta, StoryObj } from '@storybook/react'
import {
	Card,
	CardContent,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '@design-system/ui'

const meta: Meta<typeof Carousel> = {
	title: 'ui/Carousel',
	component: Carousel
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Primary: Story = {
	render: (props) => (
		<Carousel className="mx-auto w-full max-w-sm">
			<CarouselContent>
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">{index + 1}</span>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	name: 'Carousel',
	args: {
		children: 'Carousel'
	}
}
