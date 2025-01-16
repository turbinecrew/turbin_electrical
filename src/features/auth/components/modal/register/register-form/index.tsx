type RegisterFormPT = {
	formLabel: string
	inputId: string
}
export function RegisterForm({ formLabel, inputId }: RegisterFormPT) {
	return (
		<div className="flex w-full flex-col gap-5 pl-5">
			<label className="w-full text-2xl font-medium">{formLabel}</label>
			<input
				id={inputId}
				type="text"
				placeholder={`${formLabel}을(를) 입력해주세요`}
				className="h-12 w-full rounded border"
				required
			></input>
		</div>
	)
}
