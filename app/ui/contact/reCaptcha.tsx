"use client";

export function renderReCaptcha() {
	// @ts-ignore
	if (typeof window !== "undefined" && window.grecaptcha) {
		// @ts-ignore
		const { ready, render } = window.grecaptcha.enterprise;
		ready(() => {
			const container = document.querySelector(".g-recaptcha") as HTMLElement;
			if (container && !container.firstChild) {
				render(container, {
					sitekey: process.env.NEXT_PUBLIC_SITE_KEY,
					action: "send-email",
				});
			}
		});
	}
}
export default function ReCaptcha() {
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
