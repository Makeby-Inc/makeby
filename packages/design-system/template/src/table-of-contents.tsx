import { cn } from '@core/utils'
import { HTMLAttributes } from 'react'

interface TableOfContentsProps extends HTMLAttributes<HTMLDivElement> {
	content: string
}

/**
 * 리치에디터로 작성된 html 본문에 대한 목차 링크를 생성하는 컴포넌트입니다.
 * <br/> @param content - 리치에디터로 작성된 html 본문
 * <br/> @tip 사용 시 `<html className="scroll-smooth"></html>` 추천
 */
function TableOfContents({ content, className }: TableOfContentsProps) {
	const regex = /<(h[1-3])>(.*?)<\/\1>/g
	const matches = content.matchAll(regex)
	const tables = []

	for (const match of matches) {
		tables.push({
			tag: match[1],
			content: match[2]?.trim().replace(/<\/?[^>]+(>|$)/g, ''),
			id: match[2]?.trim().replace(/\s/g, '-').toLowerCase()
		})
	}

	const toc = tables.map((table) => {
		return (
			<li
				key={table.id}
				className={cn(
					table.tag === 'h3' ? 'indent-5' : table.tag === 'h2' ? 'indent-2.5' : ''
				)}
			>
				<a href={`#${table.id}`}>{table.content}</a>
			</li>
		)
	})
	return <ul className={cn('flex flex-col', className)}>{toc}</ul>
}
TableOfContents.displayName = 'TableOfContents'

/**
 * content 본문 태그에 id가 삽입된 태그로 변경해주는 함수입니다.
 * @param content - 리치에디터로 작성된 html 본문
 * @example
 * - as-is: `<h1>Title</h1><p>본문</p><h2>Sub title</h2><p>본문</p>`
 * - to-be: `<h1 id="title">제목</h1><p>본문</p><h2 id="sub-title">부제목</h2><p>본문</p>`
 * - `<Viewer data={contentForToc(data)}/>`
 */
const contentForToc = (content: string) => {
	const regex = /<(h[1-3])>(.*?)<\/\1>/g
	const matches = content.matchAll(regex)
	const tables = []

	for (const match of matches) {
		tables.push({
			tag: match[1],
			content: match[2]?.trim().replace(/<\/?[^>]+(>|$)/g, ''),
			id: match[2]?.trim().replace(/\s/g, '-').toLowerCase()
		})
	}
	let result = content
	for (const table of tables) {
		const regex = new RegExp(
			`(<${table.tag}>${table.content}<\/${table.tag}>)`,
			'g'
		)
		result = result.replace(
			regex,
			`<${table.tag} id="${table.id}">${table.content}</${table.tag}>`
		)
	}
	return result
}

export { TableOfContents, contentForToc }
