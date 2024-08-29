'use server'

import { db, type MakerFileType } from '@core/models'
import { authAction } from '@core/react'
import { revalidatePath } from 'next/cache'
import { type z } from 'zod'
import { businessMakerEditDto } from '#/maker/_model'

type BusinessMakerEditDto = z.infer<typeof businessMakerEditDto>

const editBusinessMakerAction = authAction
	.schema(businessMakerEditDto)
	.metadata({ actionName: 'editBusinessMakerAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await editBusinessMaker(userId, dto)
		revalidatePath('/maker/edit')
	})

async function editBusinessMaker(userId: string, dto: BusinessMakerEditDto) {
	const {
		isVerified: _isVerified,
		socialIds,
		businessLicenseFileUrl,
		portfolioFileUrls,
		referenceFileUrls,
		...data
	} = dto
	const maker = await db.maker.findUniqueOrThrow({
		where: {
			userId
		}
	})

	await Promise.all([
		db.makerSocialId.deleteMany({
			where: {
				makerId: maker.id
			}
		}),
		db.makerFile.deleteMany({
			where: {
				makerId: maker.id
			}
		}),
		db.makerSocialId.createMany({
			data: [
				...socialIds.map((social) => ({
					makerId: maker.id,
					type: social.socialType,
					socialId: social.socialId,
					isPrimary: social.id === 'primary'
				}))
			]
		}),
		db.makerFile.createMany({
			data: [
				{
					fileName: businessLicenseFileUrl.fileName,
					fileUrl: businessLicenseFileUrl.fileUrl,
					type: 'BUSINESS_LICENSE',
					makerId: maker.id
				},
				...portfolioFileUrls.map(({ fileName, fileUrl }) => ({
					fileName,
					fileUrl,
					type: 'PORTFOLIO' as MakerFileType,
					makerId: maker.id
				})),
				...referenceFileUrls
					.filter((file) => file.fileUrl)
					.map(({ fileName, fileUrl }) => ({
						fileName,
						fileUrl,
						type: 'REFERENCE' as MakerFileType,
						makerId: maker.id
					}))
			]
		})
	])
	await db.maker.updateMany({
		where: {
			userId
		},
		data: {
			...data
		}
	})
	return true
}

export { editBusinessMakerAction }
