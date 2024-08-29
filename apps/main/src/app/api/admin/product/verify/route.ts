import { db } from '@core/models'
import { solapiService } from '@providers/solapi'
import { SITE_DOMAIN } from '~/shared'

export async function POST(req: Request) {
	const { productId } = await req.json()

	if (!productId || typeof productId !== 'string') {
		throw new Error('Invalid productId')
	}

	const product = await db.product.update({
		where: {
			id: productId
		},
		data: {
			status: 'IN_PRODUCTION'
		},
		include: {
			maker: true
		}
	})

	await solapiService.sendKakaoAlimtalk({
		to: product.maker.phoneNumber,
		templateId: 'KA01TP240624035635756hG7pBijzOfb',
		variables: {
			'#{고객명}': product.maker.businessName,
			'#{상품명}': product.title,
			'#{url}': `${SITE_DOMAIN}/maker/product/${productId}`
		}
	})

	return Response.json(product, { status: 200 })
}
