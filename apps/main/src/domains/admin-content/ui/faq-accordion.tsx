import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@design-system/ui'

interface Faq {
	categoryId: number
	title: string
	description: string
	faqCategory: { name: string }
}

interface FaqAccordionProps {
	faq: Faq
}

export function FaqAccordion({ faq }: FaqAccordionProps) {
	return (
		<Accordion type="single" collapsible className="w-full">
			<AccordionItem value={faq.title}>
				<AccordionTrigger>
					<div className="flex gap-3">
						<div className="text-primary font-semibold">{faq.faqCategory.name}</div>
						<div>{faq.title}</div>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<p className="whitespace-pre-line break-keep">{faq.description}</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
