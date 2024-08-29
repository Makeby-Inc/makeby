interface TagsSectionProps {
	tags: string[]
}

export function TagListSection({ tags }: TagsSectionProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<span
					key={tag}
					className="bg-secondary rounded-xs px-3 py-1 text-xs font-medium"
				>
					#{tag}
				</span>
			))}
		</div>
	)
}
