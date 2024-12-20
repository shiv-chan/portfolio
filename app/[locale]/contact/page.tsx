import Form from "@/app/ui/contact/form";
import Script from "next/script";
import { renderReCaptcha } from "@/app/ui/contact/reCaptcha";
import { getI18n, getCurrentLocale } from "@/locales/server";

export default async function Page() {
	const t = await getI18n();
	const locale = await getCurrentLocale();
	return (
		<>
			<Script
				id='recaptcha-script'
				src={`https://www.google.com/recaptcha/enterprise.js?hl=${
					locale == "jp" ? "ja" : "en"
				}`}
				onReady={renderReCaptcha}
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
