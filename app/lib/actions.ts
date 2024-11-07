import { init, send } from "@emailjs/browser";
import { redirect } from "next/navigation";
import isEmail from "validator/lib/isEmail";

export type Errors = {
	user_name?: string;
	user_email?: string;
	message?: string;
};

export type State = {
	errors?: Errors;
	message?: string | null;
};

export async function sendEmail(prevState: State | null, formData: FormData) {
	try {
		let isValid: boolean = true;
		let errorObj: Errors = {
			user_name: "Please enter your name.",
			user_email: "Please enter your email address.",
			message: "Please write a message.",
		};

		const entries = formData.entries() as IterableIterator<
			["user_name" | "user_email" | "message", string]
		>;
		for (const [key, val] of entries) {
			if (Boolean(val.trim())) {
				if (key === "user_email") {
					if (!isEmail(val)) {
						errorObj[key] = "Please enter a valid email address.";
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
		const response = await send("portfolio_contact", "contact_form", {
			contact_number: formData.get("contact_number"),
			user_name: formData.get("user_name"),
			user_email: formData.get("user_email"),
			message: formData.get("message"),
		});
	} catch (error) {
		console.error("Failed to send the message...", error);
		throw new Error("Failed to send the message...");
	}

	redirect("/contact/thank-you");
}
