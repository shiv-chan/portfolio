"use client";

import { useEffect } from "react";
import PopUp from "../ui/contact/popup";

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

	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<PopUp
				succeed={false}
				heading='Error'
				subText='Sorry...failed to send your message'
				buttonText='OK'
				link='/contact'
				reset={reset}
			/>
		</div>
	);
}
