export default {
	notFound: {
		heading: "ページが見つかりません",
		subText: "お探しのページはないようです...",
		buttonText: "トップページに戻る",
	},
	error: {
		heading: "問題が発生しました....",
		subText: "あとでもう一度お試しください",
		buttonText: "トップページに戻る",
	},
	worksError: {
		heading: "問題が発生しました...プロジェクトが見つかりません",
		subText: "あとでもう一度お試しください",
		buttonText: "トップページに戻る",
	},
	work: {
		livePreview: "ライブデモを見る",
		sourceCode: "ソースコードを見る",
	},
	contact: {
		heading: "お問い合わせフォーム",
		name: "お名前",
		email: "メールアドレス",
		message: "メッセージ",
		formError: {
			name: "お名前を入力して下さい",
			email: "メールアドレスを入力して下さい",
			invalidEmail: "有効なメールアドレスを入力して下さい",
			message: "メッセージを入力して下さい",
			recaptcha: "キャプチャを入力して下さい",
		},
		sending: "送信中...",
		send: "送信",
		thanks: {
			heading: "お問い合わせありがとうございます",
			subText: "メッセージが送信されました",
			buttonText: "トップページに戻る",
		},
	},
	contactError: {
		heading: "エラー",
		subText: "メッセージの送信に失敗しました…",
		buttonText: "OK",
	},
	banner: {
		heading: "お仕事・ご依頼受付中！",
		linkText: "お問い合わせはこちら",
	},
} as const;
