"use client"; // Error boundaries must be Client Components

import { Button } from "@/app/ui/button";
import Link from "next/link";
import { FaRegFaceFrown } from "react-icons/fa6";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<h2 className='text-xl font-bold mb-1'>
				Oops! Something went wrong...can't find the work
			</h2>
			<p className='font-light mb-4'>
				Please come back and try again later{" "}
				<FaRegFaceFrown className='inline' />
			</p>
			<Link href='/'>
				<Button>Back to Top</Button>
			</Link>
		</div>
	);
}
