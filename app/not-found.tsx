import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegFaceFrown } from "react-icons/fa6";

export default function NotFound() {
	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<h2 className='text-xl font-bold mb-1'>Page Not Found</h2>
			<p className='font-light mb-4'>
				The page you are looking for does not exist...{" "}
				<FaRegFaceFrown className='inline' />
			</p>
			<Link href='/'>
				<Button>Back to Top</Button>
			</Link>
		</div>
	);
}
