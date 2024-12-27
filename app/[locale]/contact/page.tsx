"use client";

import Form from "@/app/ui/contact/form";
import Script from "next/script";
import { renderReCaptcha } from "@/app/ui/contact/reCaptcha";
import { useI18n, useCurrentLocale } from "@/locales/client";

export default function Page() {
	const t = useI18n();
	const locale = useCurrentLocale();
	return (
		<>
			<Script
				id='recaptcha-script'
				src={`https://www.google.com/recaptcha/enterprise.js?hl=${
					locale == "jp" ? "ja" : "en"
				}`}
				onReady={() => renderReCaptcha(locale)}
			/>
			<div className='mx-8 pb-20 2xl:pt-8'>
				<h2 className='text-2xl font-bold uppercase text-lavender mb-4'>
					{t("contact.heading")}
				</h2>
				<Form />
			</div>
		</>
	);
}
