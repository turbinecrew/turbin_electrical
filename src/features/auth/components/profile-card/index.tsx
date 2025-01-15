import type { profileMock } from "../mock"

import { CardLabel } from "./card-label"
export type ProfileMockKeys = keyof typeof profileMock
export function ProfileCard() {
	const mockTitle: ProfileMockKeys[] = ["사업자명", "사업자대표", "이메일"]
	return (
		<div className="mt-8 flex h-fit w-2/3 flex-col gap-4 rounded-2xl border-2 p-4 shadow-md">
			<div className="flex gap-3 pl-2 pt-2 text-3xl font-semibold">
				<p>Profile </p>-<p>Card</p>
			</div>
			<hr />
			<div className="mx-7 flex flex-col gap-6 py-3">
				{mockTitle.map((data, idx) => (
					<CardLabel key={idx} data={data} />
				))}
			</div>
		</div>
	)
}
