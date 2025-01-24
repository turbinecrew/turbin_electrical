import { useMutation } from "@tanstack/react-query"

import type { LoginResponse } from "../api/authApi"
import { postLogin } from "../api/authApi"

export const useAuth = () => {
	// 로그인 Mutation
	const loginMutation = useMutation<
		LoginResponse,
		Error,
		{ email: string; password: string }
	>({
		mutationFn: postLogin,
		onSuccess: (data) => {
			console.log("로그인 성공:", data)
		},
		onError: (error) => {
			console.error("로그인 실패:", error)
		},
	})
	// // 로그아웃 Mutation
	// const logoutMutation = useMutation(logout, {
	// 	onSuccess: () => {
	// 		console.log("로그아웃 성공")
	// 	},
	// 	onError: (error) => {
	// 		console.error("로그아웃 실패:", error)
	// 	},
	// })

	// // 회원가입 Mutation
	// const signUpMutation = useMutation(signUp, {
	// 	onSuccess: (data) => {
	// 		console.log("회원가입 성공:", data)
	// 	},
	// 	onError: (error) => {
	// 		console.error("회원가입 실패:", error)
	// 	},
	// })

	// // 사용자 정보 수정 Mutation
	// const updateUserMutation = useMutation(updateUser, {
	// 	onSuccess: (data) => {
	// 		console.log("사용자 정보 업데이트 성공:", data)
	// 	},
	// 	onError: (error) => {
	// 		console.error("사용자 정보 업데이트 실패:", error)
	// 	},
	// })
	return {
		loginMutation,
		// logoutMutation,
		// signUpMutation,
		// updateUserMutation,
	}
}
