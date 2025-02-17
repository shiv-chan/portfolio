"use client";

import { sendEmail } from "@/app/lib/actions";
import { SubmitMessageButton } from "../button";
import ReCaptcha from "./reCaptcha";
import { useFormState } from "react-dom";
import ShortUniqueId from "short-unique-id";
import { useScopedI18n, useCurrentLocale } from "@/locales/client";

export default function Form() {
	const t = useScopedI18n("contact");
	const locale = useCurrentLocale();
	const sendEmailWithLocale = sendEmail.bind(null, locale);
	const [state, formAction] = useFormState(sendEmailWithLocale, null);
	const uid = new ShortUniqueId({
		dictionary: "alpha_upper",
		length: 6,
	});

	return (
		<form action={formAction} className='flex flex-col gap-y-4 max-w-lg'>
			<input name='contact_number' type='hidden' value={uid.rnd()} />
			<div>
				<input
					name='user_name'
					type='text'
					placeholder={t("name")}
					aria-describedby='name-error'
					className='w-full text-lavender border-2 border-solid border-lavender p-1 placeholder:text-lavender/40'
				/>
				{state?.errors.user_name && (
					<div
						id='name-error'
						aria-live='polite'
						aria-atomic='true'
						className='mt-1 text-sm text-red-500'
					>
						{state.errors.user_name}
					</div>
				)}
			</div>
			<div>
				<input
					name='user_email'
					type='email'
					placeholder={t("email")}
					aria-describedby='email-error'
					className='w-full text-lavender border-2 border-solid border-lavender p-1 placeholder:text-lavender/40'
				/>
				{state?.errors.user_email && (
					<div
						id='email-error'
						aria-live='polite'
						aria-atomic='true'
						className='mt-1 text-sm text-red-500'
					>
						{state.errors.user_email}
					</div>
				)}
			</div>
			<div>
				<textarea
					name='message'
					placeholder={t("message")}
					aria-describedby='message-error'
					className='w-full text-lavender border-2 border-solid border-lavender p-1 placeholder:text-lavender/40'
				></textarea>
				{state?.errors.message && (
					<div
						id='message-error'
						aria-live='polite'
						aria-atomic='true'
						className='text-sm text-red-500'
					>
						{state.errors.message}
					</div>
				)}
			</div>
			<div>
				<ReCaptcha />
				{state?.errors["g-recaptcha-response"] && (
					<div
						id='recaptcha-error'
						aria-live='polite'
						aria-atomic='true'
						className='text-sm text-red-500'
					>
						{state.errors["g-recaptcha-response"]}
					</div>
				)}
			</div>
			<SubmitMessageButton />
		</form>
	);
}
