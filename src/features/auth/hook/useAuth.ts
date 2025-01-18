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

	return {
		loginMutation,
	}
}
