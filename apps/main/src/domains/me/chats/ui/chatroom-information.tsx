import { Separator } from '@design-system/ui'
import { Icon } from '@design-system/icon'
import Image from 'next/image'
import { commaizeNumber } from '@core/utils'
import Link from 'next/link'
import { ChatControlPopover } from '#/me/chats/ui/chat-control-popover'
import { ProfileAvatar, tradeTypeMap } from '~/shared'
import { type ChatRoomDetail } from '#/me/chats/model/chat-detail'

interface ChatroomInformationProps {
	data: ChatRoomDetail
	isSender?: boolean
}

export function ChatroomInformation({
	data,
	isSender
}: ChatroomInformationProps) {
	const { receiverUser, senderUser, fleaMarketProduct } = data
	const { id, price, productCategory, productImages, seller, title, tradeType } =
		fleaMarketProduct

	const reviews = seller.fleaMarketProducts
		.filter((product) => product.review)
		.flatMap((product) => product.review)
	const totalScore = reviews.reduce(
		(sum, review) => sum + Number(review?.score),
		0
	)
	const ratingAverage = reviews.length > 0 ? totalScore / reviews.length : 0
	const productImage =
		productImages.find((image) => image.isPrimary)?.imageUrl || ''

	return (
		<div>
			<div className="flex items-center gap-4 px-6 py-5">
				<ProfileAvatar
					imageUrl={receiverUser.image}
					name={receiverUser.name}
					size="sm"
					className="h-12 w-12 rounded-full border"
				/>
				<div className="flex flex-1 items-center gap-2 text-sm font-semibold">
					<div>{receiverUser.name}</div>
					<div className="flex items-center gap-1">
						<Icon
							name="StarIcon"
							className="text-cautionary h-[14px] w-[14px]"
							solid
						/>
						{ratingAverage.toFixed(1)}
					</div>
				</div>
				<ChatControlPopover roomId={data.id} />
			</div>

			<Link href={`/fleamarket/products/${id}`}>
				<div className="bg-secondary flex items-center gap-4 px-6 py-5">
					<Image
						src={productImage}
						alt={title}
						width={48}
						height={48}
						className="bg-background h-12 w-12 rounded-sm"
					/>
					<div className="grid gap-2 text-sm font-semibold">
						<div className="flex items-center gap-2">
							<span>{tradeTypeMap[tradeType]}</span>
							<Separator orientation="vertical" className="h-[14px]" />
							<span>{productCategory.name}</span>
							<Separator orientation="vertical" className="h-[14px]" />
							<span>{title}</span>
						</div>
						<span>{commaizeNumber(Number(price))}원</span>
					</div>
				</div>
			</Link>
		</div>
	)
}
