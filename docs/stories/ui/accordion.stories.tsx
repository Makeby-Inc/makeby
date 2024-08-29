import type { Meta, StoryObj } from '@storybook/react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@design-system/ui'

const meta: Meta<typeof Accordion> = {
	title: 'ui/Accordion',
	component: Accordion
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Primary: Story = {
	render: (props) => (
		<Accordion type="single" collapsible>
			<AccordionItem value="1">
				<AccordionTrigger>서비스 이용은 어떻게 하나요?</AccordionTrigger>
				<AccordionContent>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit voluptates,
					consectetur ipsum dolores voluptatem repudiandae error ipsa eaque, soluta
					labore quas? At illum, dolores ipsum minima esse voluptates aliquid
					dolorum.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="2">
				<AccordionTrigger>환불/교환은 어떻게 하나요?</AccordionTrigger>
				<AccordionContent>
					주문 후 7일 내에 환불/교환이 가능합니다. 마이페이지 - 내 주문 내역에서
					원하는 내역을 선택 후 환불/교환절차를 따라주세요.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="3">
				<AccordionTrigger>리뷰 포인트는 언제 적립되나요?</AccordionTrigger>
				<AccordionContent>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit voluptates,
					consectetur ipsum dolores voluptatem repudiandae error ipsa eaque, soluta
					labore quas? At illum, dolores ipsum minima esse voluptates aliquid
					dolorum.
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="4">
				<AccordionTrigger>
					타이틀이 길어지면 어떻게 보이나요? 이렇게 보여진답니다. 참고해주세요
				</AccordionTrigger>
				<AccordionContent>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit voluptates,
					consectetur ipsum dolores voluptatem repudiandae error ipsa eaque, soluta
					labore quas? At illum, dolores ipsum minima esse voluptates aliquid
					dolorum.
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	name: 'Accordion'
}
