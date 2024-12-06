import { FaLinkedin, FaGithub, FaDev } from "react-icons/fa6";

export default function SocialMedia() {
	return (
		<div className='fixed bottom-0 flex text-2xl text-lavender gap-2.5 m-8 z-10'>
			<a
				href='https://www.linkedin.com/in/kaho-shibuya/'
				target='_blank'
				aria-label='linkedin'
			>
				<FaLinkedin />
			</a>
			<a
				href='https://github.com/shiv-chan'
				target='_blank'
				aria-label='github'
			>
				<FaGithub />
			</a>
			<a href='https://dev.to/shivchan' target='_blank' aria-label='devto'>
				<FaDev />
			</a>
		</div>
	);
}
