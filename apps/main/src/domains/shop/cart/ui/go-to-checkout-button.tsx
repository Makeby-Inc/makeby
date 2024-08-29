import { Button } from '@design-system/ui'
import Link from 'next/link'

export function GoToCheckoutButton(): JSX.Element {
	return (
		<Button className="w-full" size="lg" asChild>
			<Link href="/shop/checkout">구매하기</Link>
		</Button>
	)
}
