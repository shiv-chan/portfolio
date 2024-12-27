export default {
	notFound: {
		heading: "Page Not Found",
		subText: "The page you are looking for does not exist...",
		buttonText: "Back to Top",
	},
	error: {
		heading: "Oops! Something went wrong...",
		subText: "Please come back and try again later",
		buttonText: "Back to Top",
	},
	worksError: {
		heading: "Oops! Something went wrong...can't find the work",
		subText: "Please come back and try again later",
		buttonText: "Back to Top",
	},
	work: {
		livePreview: "Live Preview",
		sourceCode: "View Source Code",
	},
	contact: {
		heading: "Love to hear from you!",
		name: "Your Name",
		email: "Email Address",
		message: "Message",
		formError: {
			name: "Please enter your name.",
			email: "Please enter your email address.",
			invalidEmail: "Please enter a valid email address.",
			message: "Please write a message.",
			recaptcha: "Please answer the captcha.",
		},
		sending: "Sending...",
		send: "Send",
		thanks: {
			heading: "Thank You!",
			subText: "Your message has successfully been sent.",
			buttonText: "Back to Top",
		},
	},
	contactError: {
		heading: "Error",
		subText: "Sorry...failed to send your message",
		buttonText: "OK",
	},
	banner: {
		heading: "I am open to work!",
		linkText: "Contact",
	},
} as const;
