import { db } from '@core/models'
import { solapiService } from '@providers/solapi'
import { SITE_DOMAIN } from '~/shared'

export async function POST(req: Request) {
	const { makerId } = await req.json()

	if (!makerId || typeof makerId !== 'string') {
		throw new Error('Invalid makerId')
	}

	const maker = await db.maker.update({
		where: {
			id: makerId
		},
		data: {
			status: 'APPROVED'
		}
	})

	await solapiService.sendKakaoAlimtalk({
		to: maker.phoneNumber,
		templateId: 'KA01TP240621111145187FHEHZhXbEOa',
		variables: {
			'#{고객명}': maker.businessName,
			'#{url}': `${SITE_DOMAIN}/maker`
		}
	})

	return Response.json(maker, { status: 200 })
}
