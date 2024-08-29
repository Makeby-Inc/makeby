import { getMyBankAccountAction } from '#/maker/calculate/action/get-my-bank-account'
import { AvailableWithdrawalSummary } from '#/maker/calculate/ui/available-withdrawal-summary'
import { RecordFilters } from '#/maker/calculate/ui/record-filters'
import { CalculateRecordsTable } from '#/maker/calculate/ui/calculate-records-table'
import { getMakerProductsAction } from '#/maker/product'
import { getMyLastAccumulatedAmountAction } from '#/maker/calculate/action/get-my-last-accumulated-amount'

export default async function CalculationDashboardPage() {
	const [bankData, productsData, availableWithdrawalAmountData] =
		await Promise.all([
			getMyBankAccountAction(),
			getMakerProductsAction({
				status: 'RELEASED'
			}),
			getMyLastAccumulatedAmountAction()
		])

	return (
		<div className="grid gap-4 py-4">
			<h1 className="text-xl font-semibold">정산 내역</h1>
			<AvailableWithdrawalSummary
				bankAccount={bankData?.data?.bankAccount}
				availableWithdrawalAmount={availableWithdrawalAmountData?.data?.amount ?? 0}
			/>
			<RecordFilters myProducts={productsData?.data ?? []} />
			<CalculateRecordsTable />
		</div>
	)
}
