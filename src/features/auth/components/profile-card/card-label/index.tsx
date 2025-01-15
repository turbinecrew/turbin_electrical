import type { ProfileMockKeys } from ".."
import { profileMock } from "../../mock"
type CardLabelPT = {
	data: ProfileMockKeys
}
export function CardLabel({ data }: CardLabelPT) {
	return (
		<div className="flex w-full justify-between gap-4 text-2xl">
			<div className="w-32 rounded-xl border-2 py-1 text-center shadow">
				{data}
			</div>
			<div className="min-w-36 border-b-2 px-4 text-end">
				{profileMock[data]}
			</div>
		</div>
	)
}
