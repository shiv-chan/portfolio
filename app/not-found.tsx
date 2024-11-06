import PopUp from "./ui/contact/popup";

export default function NotFound() {
	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<PopUp
				succeed={false}
				heading='Page Not Found'
				subText='The page you are looking for does not exist...'
				buttonText='Back to Top'
				link='/'
			/>
		</div>
	);
}
