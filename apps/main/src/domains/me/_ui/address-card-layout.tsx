import {
	UserAddressInfo,
	type UserAddressInfoProps
} from '#/me/_ui/user-address-info'

type AddressCardLayoutProps = React.PropsWithChildren<UserAddressInfoProps>

export function AddressCardLayout({
	children,
	...addressProps
}: AddressCardLayoutProps) {
	return (
		<div className="p-xl gap-xl flex w-full flex-col justify-between rounded-lg border">
			<div className="items-start">
				<UserAddressInfo {...addressProps} />
			</div>
			<div className="flex justify-between">{children}</div>
		</div>
	)
}

AddressCardLayout.defaultProps = {
	address: '주소',
	addressDetail: '상세주소',
	addressName: '주소명',
	phoneNumber: '전화번호',
	userName: '이름',
	isDefaultAddress: false
} satisfies UserAddressInfoProps
