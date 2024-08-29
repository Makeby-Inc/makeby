'use client'
import { cn } from '@core/utils'
import { Button } from '@design-system/ui'
import { useState } from 'react'
import { FaqAccordion } from '#/admin-content/ui/faq-accordion'
import type { FaqData } from '../action/get-faq'

export function FaqGridMenu({
	data,
	categories
}: {
	data: FaqData[]
	categories: string[]
}) {
	const [selectedTopic, setSelectedTopic] = useState('전체')

	const handleClick = (topic: string) => {
		setSelectedTopic(topic)
	}

	const fillTopicsWithEmpty = (topicArray: string[]) => {
		const remainder = topicArray.length % 3
		const fillCount = remainder === 0 ? 0 : 3 - remainder

		return topicArray.concat(Array(fillCount).fill(''))
	}
	const topicMenus = fillTopicsWithEmpty(categories)

	const switchFaqData = (topic: string) => {
		if (topic === '전체') {
			return data
		}

		return data.filter((faq) => faq.faqCategory.name === topic)
	}
	const faqData = switchFaqData(selectedTopic)

	return (
		<div className="grid w-full gap-6">
			<div className="grid w-full grid-cols-3">
				{topicMenus.map((topic) => (
					<Button
						key={topic}
						onClick={() => {
							handleClick(topic)
						}}
						variant="ghost"
						className={cn(
							'disabled:bg-background rounded-none border text-sm font-medium',
							topic === selectedTopic && 'bg-secondary'
						)}
						disabled={topic === ''}
					>
						{topic || '\u00A0'}
					</Button>
				))}
			</div>
			<div>
				{faqData.map((faq) => (
					<FaqAccordion key={faq.description} faq={faq} />
				))}
			</div>
		</div>
	)
}
