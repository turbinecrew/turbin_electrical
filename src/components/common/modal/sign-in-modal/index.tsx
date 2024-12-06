import React from "react"
import { X } from "lucide-react" // X 아이콘 임포트

type ModalProps = {
	closeModal: () => void
}

const SignInModal: React.FC<ModalProps> = ({ closeModal }) => {
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		// 로그인 처리 로직 추가해야 함
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
			<div className="relative w-96 rounded-lg bg-white p-6 shadow-lg">
				{/* X 아이콘을 이용한 Close 버튼 */}
				<div className="absolute right-4 top-4">
					<button type="button" onClick={closeModal} className="text-black">
						<X size={32} /> {/* X 아이콘 크기를 32로 키움 */}
					</button>
				</div>

				{/* 제목 */}
				<h2 className="mb-8 text-center text-2xl font-semibold">Welcome!</h2>

				{/* 소셜 로그인 버튼들  */}
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

				{/* "or" 구분 */}
				<div className="mb-4 text-center text-gray-500">or</div>

				{/* 기본 로그인 폼 */}
				<form onSubmit={handleSubmit}>
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
					<button
						type="submit"
						className="w-full rounded bg-blue-500 py-2 text-white"
					>
						Sign Up
					</button>
				</form>

				{/* 계정이 이미 있는 경우 로그인 링크 */}
				<div className="mt-4 flex justify-center">
					<button
						type="button"
						onClick={closeModal}
						className="text-sm text-gray-500"
					>
						Already have an account? Sign in
					</button>
				</div>
			</div>
		</div>
	)
}

export default SignInModal
