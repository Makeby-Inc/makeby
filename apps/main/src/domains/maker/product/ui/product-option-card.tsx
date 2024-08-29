import { Button, Input, Label } from '@design-system/ui'
import { commaizeNumber } from '@core/utils'
import { type OptionData } from '#/maker/product/model'
import { ProductThumbnailSection } from '#/maker/product/ui/product-thumbnail-section'

interface ProductOptionCardProps {
	optionLabel: string
	data: OptionData
	isPrimary?: boolean
	onDelete: (id: string) => void
	onChange: (data: OptionData) => void
}

export function ProductOptionCard({
	optionLabel,
	data,
	isPrimary = false,
	onDelete,
	onChange
}: ProductOptionCardProps) {
	const { id, thumbnailUrl, title, description, price, stock } = data
	return (
		<div className="bg-secondary border-strong rounded-md border">
			<div className="border-strong flex items-center justify-between border-b px-5 py-4">
				<span className="text-sm font-semibold">{optionLabel}</span>
				{!isPrimary && (
					<Button
						type="button"
						size="sm"
						variant="outline"
						className="border-strong"
						onClick={() => {
							onDelete(id)
						}}
					>
						삭제
					</Button>
				)}
			</div>
			<div className="grid gap-6 p-5">
				<ActionLabel title="썸네일">
					<ProductThumbnailSection
						size="sm"
						className="bg-background border-strong rounded-md border "
						value={thumbnailUrl}
						onChange={(v) => {
							onChange({ ...data, thumbnailUrl: v as string })
						}}
					/>
				</ActionLabel>
				<Label size="sm" title="옵션 이름">
					<Input
						placeholder="옵션 이름을 입력해 주세요"
						maxLength={50}
						value={title}
						onChange={(e) => {
							onChange({ ...data, title: e.target.value })
						}}
					/>
				</Label>
				<Label size="sm" title="옵션 설명">
					<Input
						placeholder="옵션 설명을 입력해 주세요"
						maxLength={100}
						value={description}
						onChange={(e) => {
							onChange({ ...data, description: e.target.value })
						}}
					/>
				</Label>
				<Label size="sm" title="판매 가격">
					<div className="flex items-center gap-2">
						<Input
							placeholder="1,000,000"
							value={price === undefined ? '' : commaizeNumber(price)}
							onChange={(e) => {
								const value = e.target.value
								// only allow numbers and commas
								if (!/^[0-9,]*$/.test(value)) {
									return
								}

								onChange({ ...data, price: Number(e.target.value.replace(/,/g, '')) })
							}}
						/>
						<span className="text-sm">원</span>
					</div>
				</Label>
				<Label size="sm" title="제작 수량">
					<div className="grid gap-[5px]">
						<Input
							placeholder="100"
							value={stock === undefined ? '' : commaizeNumber(stock)}
							onChange={(e) => {
								onChange({ ...data, stock: Number(e.target.value.replace(/,/g, '')) })
							}}
						/>
						<span className="text-secondary-foreground text-sm font-light">
							해당 옵션에 대한 원하시는 제작 수량을 적어주세요. 해당 수량만큼 판매 전
							선제작되며, 선택하신 수량에 따라 제작비를 미리 납부하셔야 하니 신중하게
							적어주세요.
						</span>
					</div>
				</Label>
			</div>
		</div>
	)
}

function ActionLabel({
	title,
	children
}: {
	title: string
	children: React.ReactNode
}) {
	return (
		<div className="grid gap-2">
			<span className="text-sm font-semibold">{title}</span>
			{children}
		</div>
	)
}
