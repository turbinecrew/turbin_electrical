import { Modal, ModalContext, ModalHeader } from "@/common/components/modal"
import { useSignUp } from "@/features/auth/hook/useSignUp"

import { RegisterForm } from "./register-form"
import { additionalLabel } from "./regiterList"

export default function RegisterModal({
	isOpen,
	setIsOpen,
	onRegisterComplete,
}: {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
	onRegisterComplete: (state: boolean) => void
}) {
	const { additionalData, setAdditionalData } = useSignUp()

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault()
		const formData: typeof additionalData = additionalLabel.reduce(
			(acc, field) => {
				const value = (document.getElementById(field.id) as HTMLInputElement)
					.value
				acc[field.id as keyof typeof additionalData] = value
				return acc
			},
			{ ...additionalData },
		)
		setAdditionalData(formData)
		alert("회원가입이 완료되었습니다!")
		setIsOpen(false)
		onRegisterComplete(false)
	}
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<div className="flex items-center justify-center py-3 text-3xl">
					사업자 정보추가
				</div>
			</ModalHeader>
			<ModalContext>
				<form
					className="flex flex-col items-center gap-8 py-8"
					onSubmit={handleRegister}
				>
					{additionalLabel.map((data, idx) => (
						<RegisterForm key={idx} formLabel={data.label} inputId={data.id} />
					))}
					<button
						type="submit"
						className="h-11 w-44 cursor-pointer rounded bg-green-400 text-white active:bg-green-800"
					>
						가입하기
					</button>
				</form>
			</ModalContext>
		</Modal>
	)
}
