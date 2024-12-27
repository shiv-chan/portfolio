"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

export function OpenToWorkBanner() {
	const pathname: string | null = usePathname();
	const pathArr = pathname.split("/");
	const currentPage: string | null = pathArr[1];
	const t = useScopedI18n("banner");

	return (
		(currentPage === "" || currentPage == "jp") &&
		pathArr.length == 2 && (
			<div className='sticky top-0 bg-lavender text-white uppercase font-bold text-sm text-center py-1.5 w-dvw h-fit md:col-span-1'>
				{t("heading")}
				<Link href='/contact' className='underline'>
					{t("linkText")}
				</Link>
			</div>
		)
	);
}
