"use client"; // Error boundaries must be Client Components

import { Button } from "@/app/ui/button";
import Link from "next/link";
import { FaRegFaceFrown } from "react-icons/fa6";
import { useScopedI18n } from "@/locales/client";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useScopedI18n("error");

	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<h2 className='text-xl font-bold mb-1'>{t("heading")}</h2>
			<p className='font-light mb-4'>
				{t("subText")}
				<FaRegFaceFrown className='inline' />
			</p>
			<Link href='/'>
				<Button>{t("buttonText")}</Button>
			</Link>
		</div>
	);
}
