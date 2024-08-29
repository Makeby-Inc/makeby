import { WithDefaultImage } from '~/shared/ui'

interface MakerCartLayoutProps {
	slug: string
	name: string
	profileImageUrl?: string | null
	children?: React.ReactNode
}

export function MakerCartLayout({
	slug,
	name,
	profileImageUrl,
	children
}: MakerCartLayoutProps): JSX.Element {
	return (
		<div key={slug}>
			<div className="border-secondary bg-secondary flex items-center gap-3 border-b p-4">
				<WithDefaultImage
					src={profileImageUrl}
					alt={name}
					width={50}
					height={50}
					className=" h-11 w-11 rounded-full"
				/>
				<h5 className="text-sm font-semibold">{name}</h5>
			</div>
			{children}
		</div>
	)
}
