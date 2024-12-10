import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/common/modal"

type SignUpModalPT = {
	isOpen: boolean
	closeModal: () => void
}

export function SignUpModal({ isOpen, closeModal }: SignUpModalPT) {
	if (!isOpen) return null

	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			<ModalHeader>
				<h2>Sign Up</h2>
			</ModalHeader>
			<ModalContext>
				<form>
					<input
						type="text"
						placeholder="Full Name"
						className="mb-4 w-full rounded border p-2"
					/>
					<input
						type="email"
						placeholder="Email"
						className="mb-4 w-full rounded border p-2"
					/>
					<input
						type="password"
						placeholder="Password"
						className="mb-4 w-full rounded border p-2"
					/>
				</form>
			</ModalContext>
			<ModalFooter>
				<button
					className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
					onClick={closeModal}
				>
					Cancel
				</button>
				<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Submit
				</button>
			</ModalFooter>
		</Modal>
	)
}
