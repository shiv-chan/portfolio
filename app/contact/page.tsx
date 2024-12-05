import Form from "@/app/ui/contact/form";
import Script from "next/script";
import { renderReCaptcha } from "../ui/contact/reCaptcha";

export default function Page() {
	return (
		<>
			<Script
				src='https://www.google.com/recaptcha/enterprise.js'
				strategy='lazyOnload'
				onReady={renderReCaptcha}
			/>
			<div className='mx-8 pb-20 2xl:pt-8'>
				<h2 className='text-2xl font-bold uppercase text-lavender mb-4'>
					Love to hear from you!
				</h2>
				<Form />
			</div>
		</>
	);
}
