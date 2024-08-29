'use server'

import {
	type MakerType,
	type PlanType,
	db,
	type MakerFileType
} from '@core/models'
import { authAction } from '@core/react'
import { type z } from 'zod'
import { solapiService } from '@providers/solapi'
import { individualMakerRegisterDto } from '#/maker/_model'
import { SITE_DOMAIN, SITE_URL } from '~/shared/lib'

type IndividualMakerRegisterDto = z.infer<typeof individualMakerRegisterDto>

const registerIndividualMakerAction = authAction
	.schema(individualMakerRegisterDto)
	.metadata({ actionName: 'registerIndividualMaker' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await registerIndividualMaker(userId, dto)
	})

async function registerIndividualMaker(
	userId: string,
	dto: IndividualMakerRegisterDto
) {
	const {
		makerType,
		plan,
		socialIds,
		portfolioFileUrls,
		referenceFileUrls,
		isVerified: _,
		...data
	} = dto

	const maker = await db.maker.create({
		data: {
			userId,
			makerType: makerType as MakerType,
			plan: plan as PlanType,
			...data,
			socialIds: {
				createMany: {
					data: socialIds.map(({ id, socialId, socialType }) => ({
						type: socialType,
						socialId,
						isPrimary: id === 'primary'
					}))
				}
			},
			files: {
				createMany: {
					data: [
						...portfolioFileUrls.map(({ fileName, fileUrl }) => ({
							fileName,
							fileUrl,
							type: 'PORTFOLIO' as MakerFileType
						})),
						...referenceFileUrls
							.filter((file) => file.fileUrl)
							.map(({ fileName, fileUrl }) => ({
								fileName,
								fileUrl,
								type: 'REFERENCE' as MakerFileType
							}))
					]
				}
			}
		}
	})

	await solapiService.sendKakaoAlimtalk({
		to: maker.phoneNumber,
		templateId: 'KA01TP240621110529464uyU3GuQGzQi',
		variables: {
			'#{고객명}': maker.businessName,
			'#{url}': SITE_DOMAIN
		}
	})

	await db.notification.create({
		data: {
			notificationType: '메이커 신청 완료',
			content:
				'메이커 신청이 완료되었습니다. 빠르게 검토 후 연락드리겠습니다. 3영업일 정도 소요됩니다.',
			user: {
				connect: {
					id: userId
				}
			}
		}
	})
}

export { registerIndividualMakerAction }
