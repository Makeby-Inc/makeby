import Link from 'next/link'
import { type DeliveryInformation } from '@core/models'
import { type UserInformationDto } from '#/me/_model'
import { ProvidersById } from '#/me/_ui/providers-by-id'
import { SubscribeArea } from '#/me/_ui/area-subscribe'
import { ProfileImageArea } from '#/me/_ui/area-profile-image'
import { NicknameArea } from '#/me/_ui/area-nickname'
import { PhoneNumberArea } from '#/me/_ui/area-phone-number'
import { DeliveryInfoEmpty, DeliveryInfoListModal } from '#/me/order'
import { SelectedDeliveryInfo } from '#/shop/order'

export function MyInfoMenu({
	myData,
	providers,
	deliveryInfo,
	deliveryInfos
}: {
	myData: UserInformationDto
	providers: string[]
	deliveryInfo?: DeliveryInformation | null
	deliveryInfos: DeliveryInformation[]
}) {
	return (
		<div className="pc:px-[400px] pc:py-[60px] flex flex-col gap-[60px] p-4">
			<div className="max-pc:hidden text-3xl font-semibold">회원 정보 수정</div>
			<div className="flex flex-col gap-6 pt-4">
				<div className="flex flex-col gap-[2px]">
					<div className="pc:text-xl text-lg font-semibold">로그인 정보</div>
					<div className="text-secondary-foreground text-sm font-normal">
						현재 연결되어있는 SNS 계정이에요
					</div>
				</div>
				<ProvidersById
					providers={providers as ('kakao' | 'google' | 'naver' | null)[]}
				/>
			</div>
			<div className="flex flex-col gap-10">
				<div className="pc:text-xl text-lg font-semibold">회원 정보</div>
				<ProfileImageArea myData={myData} />
				<NicknameArea myData={myData} />
				<PhoneNumberArea myData={myData} />
				<div className="flex flex-col gap-[5px]">
					<div className="text-sm font-semibold">생년월일</div>
					<div className="font-semibold">{`${myData.birthDate?.getFullYear()}.**.**`}</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="grid gap-4">
						{deliveryInfo ? (
							<SelectedDeliveryInfo primaryDeliveryInfo={deliveryInfo} />
						) : (
							<DeliveryInfoEmpty />
						)}
						<DeliveryInfoListModal inCheckout deliveryInfos={deliveryInfos} />
					</div>
				</div>
			</div>
			<SubscribeArea myData={myData} />
			<Link href="https://pf.kakao.com/_gGhXG">
				<div className="font-semibold underline">회원 탈퇴</div>
			</Link>
		</div>
	)
}
