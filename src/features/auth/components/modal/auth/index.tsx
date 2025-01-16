import { useState } from "react"

import {
	Modal,
	ModalHeader,
	ModalContext,
	ModalFooter,
} from "@/common/components/modal"

import { SignInContent } from "./modal-content/sign-in"
import { SignUpContent } from "./modal-content/sign-up"
import { SocialLoginButton } from "./social-button"
import { ToggleButton } from "./toggle-button"

export default function AuthModal({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean
	setIsOpen: (state: boolean) => void
}) {
	const [active, setActive] = useState<"IN" | "UP">("IN")

	const toggleState = active === "IN" ? "UP" : "IN"

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalHeader>
				<div className="flex w-full gap-3 pl-2 text-3xl">
					<div className="font-semibold">SIGN</div>
					<div className="flex w-16 items-end justify-between">
						<div className="font-medium text-gray-500">{active}</div>
						<ToggleButton
							label={toggleState}
							onClick={() => setActive(toggleState)}
						/>
					</div>
				</div>
			</ModalHeader>
			<ModalContext>
				<div className="flex flex-col items-center gap-8 pt-3">
					<SocialLoginButton />
					<div className="relative flex w-full items-center">
						<div className="w-full border-t border-gray-300"></div>
						<span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
							or
						</span>
					</div>
					{active === "IN" ? (
						<SignInContent />
					) : (
						<SignUpContent setIsOpen={setIsOpen} />
					)}
				</div>
			</ModalContext>
			<ModalFooter>
				<h3>Join with Turbin Crew !</h3>
			</ModalFooter>
		</Modal>
	)
}
