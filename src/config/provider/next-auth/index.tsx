"use client"

import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

type NextAuthProviderProps = {
	children: ReactNode
	session?: Session | null
}

export default function NextAuthProvider({
	children,
	session,
}: NextAuthProviderProps) {
	return <SessionProvider session={session}>{children}</SessionProvider>
}
