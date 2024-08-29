import { EmptyContent } from '~/shared/ui/empty-content'

export default function NotFoundPage() {
	return (
		<section className="py-10">
			<EmptyContent title="존재하지 않거나 삭제된 채팅방입니다" />
		</section>
	)
}
