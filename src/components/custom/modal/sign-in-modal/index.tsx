import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/common/modal"
type SignInModalPT = {
	isOpen: boolean
	closeModal: () => void
}

export function SignInModal({ isOpen, closeModal }: SignInModalPT) {
	if (!isOpen) return null

	return (
		<Modal isOpen={isOpen} closeModal={closeModal}>
			{/* 헤더 */}
			<ModalHeader>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">Welcome!</h2>
					<button
						type="button"
						onClick={closeModal}
						className="text-black hover:text-gray-700"
					></button>
				</div>
			</ModalHeader>

			{/* 컨텍스트: 로그인 내용 */}
			<ModalContext>
				{/* 소셜 로그인 버튼들 */}
				<div className="mb-6 flex justify-between gap-4">
					<button className="flex w-full items-center justify-center rounded bg-yellow-400 px-4 py-2 text-white">
						<i className="fab fa-kakao mr-2 text-yellow-500"></i>
						Kakao Login
					</button>
					<button className="flex w-full items-center justify-center rounded bg-black px-4 py-2 text-white">
						<i className="fab fa-apple mr-2 text-white"></i>
						Apple Login
					</button>
					<button className="flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 text-white">
						<i className="fab fa-google mr-2 text-white"></i>
						Google Login
					</button>
				</div>

				{/* "or" 구분선 */}
				<div className="mb-4 text-center text-gray-500">or</div>

				{/* 기본 로그인 폼 */}
				<form>
					<input
						type="text"
						placeholder="Your full name"
						className="mb-4 w-full rounded border p-2"
						aria-label="Username"
					/>
					<input
						type="email"
						placeholder="Your email"
						className="mb-4 w-full rounded border p-2"
						aria-label="Email"
					/>
					<input
						type="password"
						placeholder="Your password"
						className="mb-4 w-full rounded border p-2"
						aria-label="Password"
					/>
					<div className="mb-4 flex items-center">
						<input type="checkbox" id="rememberMe" className="mr-2" />
						<label htmlFor="rememberMe" className="text-gray-700">
							Remember me
						</label>
					</div>
				</form>
			</ModalContext>

			{/* 푸터 */}
			<ModalFooter>
				<button
					type="button"
					onClick={closeModal}
					className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
				>
					Cancel
				</button>
				<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
					Sign Up
				</button>
			</ModalFooter>
		</Modal>
	)
}
