import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/common/modal"

export default function SignInModal({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
}) {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<h1>Sign In</h1>
			</ModalHeader>
			<ModalContext>
				<div className="flex flex-col items-center gap-4">
					<button className="w-full rounded bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-500">
						Kakao Login
					</button>
					<button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
						Google Login
					</button>
				</div>
			</ModalContext>
			<ModalFooter>
				<h3>Join with Turbin Crew !</h3>
			</ModalFooter>
		</Modal>
	)
}
