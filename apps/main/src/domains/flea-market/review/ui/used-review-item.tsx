import { Icon } from '@design-system/icon'

interface UsedReviewItemProps {
	reviewerName: string
	reviewerImageUrl: string
	reviewDate: string
	reviewText: string
	reviewProductName: string
}

function UsedReviewItem({
	reviewerName,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- TODO
	reviewerImageUrl,
	reviewDate,
	reviewText,
	reviewProductName
}: UsedReviewItemProps) {
	return (
		<div className="inline-flex h-full w-auto flex-col items-start justify-start gap-6">
			<div className="inline-flex items-start justify-start gap-4 self-stretch">
				<div className="bg-secondary h-11 w-11 rounded-full border" />
				<div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2 self-stretch">
					<div className="flex flex-col items-start justify-center gap-0.5">
						<div className="flex items-center justify-center gap-2">
							<div className=" text-foreground text-sm font-semibold">
								{reviewerName}
							</div>
							<div className="flex items-center justify-start gap-1">
								<Icon
									name="StarIcon"
									solid
									className="h-3.5 w-3.5 items-center justify-center text-[#EAB308]"
								/>
								<div className=" text-foreground text-sm">3.0</div>
							</div>
						</div>
						<div className=" text-secondary-foreground text-xs">{reviewDate}</div>
					</div>
					<div className=" text-secondary-foreground text-sm">
						{reviewProductName}
					</div>
					<div className="inline-flex items-center justify-center gap-6 self-stretch">
						<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-4">
							<div className="text-foreground  self-stretch text-sm">{reviewText}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UsedReviewItem
