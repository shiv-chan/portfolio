"use client";

export function renderReCaptcha(locale: string) {
	const hl = locale == "jp" ? "ja" : "en";
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
					hl,
				});
			}
		});
	}
}

export default function ReCaptcha() {
	return (
		<>
			<div
				className='g-recaptcha h-[78px] before:block before:motion-safe:animate-pulse before:w-[300px] before:h-[74px] before:rounded before:bg-lavender-light before:-z-10 before:absolute'
				data-sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
				data-action='send-email'
				aria-describedby='recaptcha-error'
			></div>
		</>
	);
}
