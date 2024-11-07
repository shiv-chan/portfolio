import Link from "next/link";
import { FaRegFaceSmile, FaRegFaceFrown } from "react-icons/fa6";
import { Button } from "../button";

interface PopupProps {
	succeed: boolean;
	heading: string;
	subText: string;
	buttonText: string;
	link: string;
	reset?: () => void;
}

export default function PopUp({
	succeed,
	heading,
	subText,
	buttonText,
	link,
	reset,
}: PopupProps) {
	return (
		<div className='flex flex-col items-center gap-y-2 border-4 bg-white border-solid border-lavender text-lavender text-xl max-w-max m-6 py-6 px-14 drop-shadow-selected'>
			{
				<>
					{succeed ? <FaRegFaceSmile /> : <FaRegFaceFrown />}
					<div className='text-center font-light'>
						<h2 className='text-xl font-bold'>{heading}</h2>
						<p className='text-base'>{subText}</p>
					</div>
					<Link href={link}>
						<Button onClick={reset}>{buttonText}</Button>
					</Link>
				</>
			}
		</div>
	);
}
