import { authService } from '@providers/auth'
import { redirect } from 'next/navigation'
import { MyInfoMenu, getMyDataAction } from '#/me'
import { MobileDetailHeader } from '~/shared'
import { getProvidersByUserIdAction } from '#/me/_action'
import { getDeliveryInfoList, getPrimaryDeliveryInfoAction } from '#/me/order'

export const metadata = {
	title: '회원 정보 수정'
}

export default async function MeProfilePage() {
	const userId = await authService.getMyUserIdOrThrow()
	if (!userId) redirect('/start')
	const myData = await getMyDataAction(userId)

	const providers = await getProvidersByUserIdAction(userId)
	const providersList = providers.map((provider) => provider.provider)

	const [selectedDeliveryInfoData, deliveryInfosData] = await Promise.all([
		getPrimaryDeliveryInfoAction(),
		getDeliveryInfoList()
	])
	const deliveryInfo = selectedDeliveryInfoData?.data
	const deliveryInfos = deliveryInfosData?.data?.deliveryInfoList ?? []

	return (
		<div>
			<MobileDetailHeader pageTitle="회원 정보 수정" />
			<MyInfoMenu
				myData={myData}
				providers={providersList}
				deliveryInfo={deliveryInfo}
				deliveryInfos={deliveryInfos}
			/>
		</div>
	)
}
