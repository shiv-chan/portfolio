"use client";

import { useEffect, useRef } from "react";

export default function ReCaptcha() {
	const recaptchaRef = useRef(null);
	const renderReCaptcha = () => {
		console.log("renderReCaptcha is called");
		// @ts-ignore
		if (typeof window !== "undefined" && window.grecaptcha) {
			console.log("renderReCaptcha inside if");
			// @ts-ignore
			const { ready, render } = window.grecaptcha.enterprise;
			ready(() => {
				console.log("recaptchaRef.current: ", recaptchaRef.current);
				if (recaptchaRef.current) {
					render(recaptchaRef.current, {
						sitekey: process.env.NEXT_PUBLIC_SITE_KEY,
						action: "send-email",
					});
				}
			});
		}
	};

	useEffect(() => renderReCaptcha, []);

	return (
		<>
			<div
				ref={recaptchaRef}
				className='g-recaptcha'
				data-sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
				data-action='send-email'
				aria-describedby='recaptcha-error'
			></div>
		</>
	);
}
