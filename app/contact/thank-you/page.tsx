import PopUp from "@/app/ui/contact/popup";

export default function Page() {
	return (
		<PopUp
			succeed={true}
			heading='Thank You!'
			subText='Your message has successfully been sent.'
			buttonText='Back to Top'
			link='/'
		/>
	);
}
