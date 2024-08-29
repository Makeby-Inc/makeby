import { Badge, Separator } from '@design-system/ui'

export interface UserAddressInfoProps {
	userName: string
	addressName: string
	address: string
	addressDetail?: string
	phoneNumber: string
	isDefaultAddress?: boolean
}
export function UserAddressInfo({
	userName,
	addressName,
	address,
	addressDetail,
	phoneNumber,
	isDefaultAddress
}: UserAddressInfoProps) {
	const maskLength = userName.length - 2
	return (
		<div className="gap-xs flex flex-col">
			{!!isDefaultAddress && (
				<Badge className="w-fit" variant="secondary">
					기본 배송지
				</Badge>
			)}
			<div className="flex items-center gap-2 font-semibold">
				<div>{addressName}</div>
				<Separator orientation="vertical" className="h-3" />
				<div>
					{userName.length === 2
						? `${userName[0]}*`
						: `${userName[0]}${'*'.repeat(maskLength)}${
								userName[userName.length - 1]
						  }`}
				</div>
			</div>
			<div className="text-secondary-foreground text-sm">
				{address} {addressDetail}
			</div>
			<div className="text-secondary-foreground text-sm">{phoneNumber}</div>
		</div>
	)
}
