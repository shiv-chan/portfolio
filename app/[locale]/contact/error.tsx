"use client";

import { useEffect } from "react";
import PopUp from "@/app/ui/contact/popup";
import { useScopedI18n } from "@/locales/client";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	const t = useScopedI18n("contactError");

	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<PopUp
				succeed={false}
				heading={t("heading")}
				subText={t("subText")}
				buttonText={t("buttonText")}
				link='/contact'
				reset={reset}
			/>
		</div>
	);
}
