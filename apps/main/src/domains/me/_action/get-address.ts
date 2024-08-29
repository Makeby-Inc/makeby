import { db } from '@core/models'

export async function getAddressAction(id: string) {
	const user = await db.user.findUniqueOrThrow({
		where: { id },
		select: { deliveryInformations: true }
	})
	return user
}
