"use client";

import clsx from "clsx";
import { mulish } from "./fonts";
import { useScopedI18n } from "@/locales/client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<button
			{...rest}
			className={clsx(
				"text-sm text-center font-bold border-2 border-solid rounded-3xl border-lavender bg-white text-lavender py-1 px-5 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-900 disabled:hover:drop-shadow-none disabled:cursor-not-allowed hover:text-white hover:bg-lavender hover:drop-shadow-selected",
				mulish.className,
				className
			)}
		>
			{children}
		</button>
	);
}

import { useFormStatus } from "react-dom";

export function SubmitMessageButton({
	className,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { pending } = useFormStatus();
	const t = useScopedI18n("contact");

	return (
		<Button
			type='submit'
			className={clsx("w-full", className)}
			disabled={pending}
		>
			{pending ? t("sending") : t("send")}
		</Button>
	);
}
