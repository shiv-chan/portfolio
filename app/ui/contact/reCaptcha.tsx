"use client";

import { useEffect } from "react";

export function renderReCaptcha() {
	// @ts-ignore
	if (typeof window !== "undefined" && window.grecaptcha) {
		// @ts-ignore
		const { ready, render } = window.grecaptcha.enterprise;
		ready(() => {
			console.log(document.querySelector(".g-recaptcha"));
			render(document.querySelector(".g-recaptcha") as HTMLDivElement, {
				sitekey: process.env.NEXT_PUBLIC_SITE_KEY,
				action: "send-email",
			});
		});
	}
}
export default function ReCaptcha() {
	useEffect(() => renderReCaptcha, []);

	return (
		<>
			<div
				className='g-recaptcha'
				data-sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
				data-action='send-email'
				aria-describedby='recaptcha-error'
			></div>
		</>
	);
}
