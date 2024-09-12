"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function OpenToWorkBanner() {
	const pathname: string | null = usePathname();
	const currentPage: string | null = pathname.split("/")[1];

	return (
		currentPage === "" && (
			<div className='sticky top-0 bg-lavender text-white uppercase font-bold text-sm text-center py-1.5 w-dvw h-fit md:col-span-1'>
				I am open to work!{" "}
				<Link href='/contact' className='underline'>
					Contact
				</Link>
			</div>
		)
	);
}
