'use server'

import { db, type MakerFileType } from '@core/models'
import { authAction } from '@core/react'
import { type z } from 'zod'
import { revalidatePath } from 'next/cache'
import { individualMakerEditDto } from '#/maker/_model'

type IndividualMakerEditDto = z.infer<typeof individualMakerEditDto>

const editIndividualMakerAction = authAction
	.schema(individualMakerEditDto)
	.metadata({ actionName: 'editIndividualMakerAction' })
	.action(async ({ parsedInput: dto, ctx: { userId } }) => {
		await editIndividualMaker(userId, dto)
		revalidatePath('/maker/edit')
	})

async function editIndividualMaker(
	userId: string,
	dto: IndividualMakerEditDto
) {
	const {
		isVerified: _isVerified,
		socialIds,
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

export { editIndividualMakerAction }
