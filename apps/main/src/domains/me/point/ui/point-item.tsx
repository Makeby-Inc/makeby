interface PointItemProps {
	eventYear: number
	eventMonth: number
	eventDay: number
	itemName: string
	itemAmount: number
	productName: string
	optionName: string
}

//eventMonth, eventDay 한자릿수로 들어왔을때 앞에 0 출력 필요
function PointItem({
	eventYear,
	eventMonth,
	eventDay,
	itemName,
	itemAmount,
	productName,
	optionName
}: PointItemProps) {
	return (
		<div className="flex items-start justify-between py-4">
			<div className="flex gap-10">
				<div className="text-muted-foreground text-sm font-semibold">
					{eventYear}
				</div>
				<div className="text-sm font-semibold">
					{eventMonth}.{eventDay}
				</div>
				<div className="flex flex-col text-sm">
					<div className="font-bold">{itemName}</div>
					<div className="font-medium">{productName}</div>
					<div>{optionName}</div>
				</div>
			</div>
			<div className="font-semibold">{itemAmount}</div>
		</div>
	)
}

export default PointItem
