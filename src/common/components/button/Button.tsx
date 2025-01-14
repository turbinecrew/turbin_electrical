"use client"

import type { VariantProps } from "class-variance-authority"
import cn from "clsx"
import type { ButtonHTMLAttributes, ReactNode } from "react"
import React from "react"

import { buttonVariants } from "./buttonVariants"

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
	className?: string
	children: ReactNode
	variant?: VariantProps<typeof buttonVariants>["variant"]
	size?: VariantProps<typeof buttonVariants>["size"]
	color?: VariantProps<typeof buttonVariants>["color"]
	type?: "button" | "submit"
}

export default function Button({
	className,
	variant,
	size,
	color,
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			type={rest.type || "button"}
			className={cn(buttonVariants({ variant, size, color }), className)}
		>
			{children}
		</button>
	)
}

Button.defaultProps = {
	variant: "default",
	size: "md",
	color: "tbGreen",
}
