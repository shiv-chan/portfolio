import { init, send } from "@emailjs/browser";
import { redirect } from "next/navigation";
import isEmail from "validator/lib/isEmail";
import en from "@/locales/en";
import jp from "@/locales/jp";

export type Errors = {
	user_name?: string;
	user_email?: string;
	message?: string;
	"g-recaptcha-response"?: string;
};

export type State = {
	errors?: Errors;
	message?: string | null;
};

type TranslationKeys = keyof typeof en.contact.formError;

export async function sendEmail(
	locale: string,
	prevState: State | null,
	formData: FormData
) {
	const translation = locale == "jp" ? jp : en;
	const t = (key: TranslationKeys) => translation.contact.formError[key];
	try {
		let isValid: boolean = true;
		let errorObj: Errors = {
			user_name: t("name"),
			user_email: t("email"),
			message: t("message"),
			"g-recaptcha-response": t("recaptcha"),
		};

		const entries = formData.entries() as IterableIterator<
			["user_name" | "user_email" | "message" | "g-recaptcha-response", string]
		>;
		for (const [key, val] of entries) {
			if (Boolean(val.trim())) {
				if (key === "user_email") {
					if (!isEmail(val)) {
						errorObj[key] = t("invalidEmail");
						isValid = false;
					} else {
						delete errorObj[key];
					}
				} else {
					delete errorObj[key];
				}
			} else {
				isValid = false;
			}
		}

		if (!isValid)
			return {
				errors: errorObj,
				message: "Missing fields...",
			};

		await init({ publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });
		await send("portfolio_contact", "contact_form", {
			contact_number: formData.get("contact_number"),
			user_name: formData.get("user_name"),
			user_email: formData.get("user_email"),
			message: formData.get("message"),
			"g-recaptcha-response": formData.get("g-recaptcha-response"),
		});
	} catch (error) {
		console.error("Failed to send the message...", error);
		throw new Error("Failed to send the message...");
	}

	redirect("/contact/thank-you");
}
