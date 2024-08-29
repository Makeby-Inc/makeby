import Link from 'next/link'
import { MobileDetailHeader } from '~/shared/ui'
import { SearchInput } from '~/shared/ui/search-input'
import { searchProductsAction } from '~/shared/action/search-products'
import { SearchResult } from '~/shared/ui/search-result'

interface SearchPageProps {
	searchParams: {
		keyword?: string
	}
}

export function generateMetadata({ searchParams }: SearchPageProps) {
	const { keyword } = searchParams
	const query = keyword?.trim()

	if (!query) return { title: '검색' }

	return {
		title: `${query} - 검색결과`
	}
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { keyword } = searchParams
	const query = keyword?.trim()

	if (!query)
		return (
			<section className="pc:hidden py-3">
				<SearchInput />
			</section>
		)

	const { products, fleamarketProducts } = await searchProductsAction(query)

	return (
		<>
			<MobileDetailHeader
				fallbackUrl="/"
				pageTitle={<SearchInput />}
				rightAction={
					<Link href="/search" className="whitespace-nowrap">
						취소
					</Link>
				}
			/>
			<section className="pc:py-[60px] py-4">
				<h1 className="pc:mb-10 pc:text-4xl mb-6 text-2xl font-semibold">
					<span className="mr-1">{query}</span>
					<span className="text-secondary-foreground">검색결과</span>
				</h1>
				<SearchResult products={products} fleaMarketProducts={fleamarketProducts} />
			</section>
		</>
	)
}
