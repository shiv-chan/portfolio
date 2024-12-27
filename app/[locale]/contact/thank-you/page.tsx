import PopUp from "@/app/ui/contact/popup";
import { getScopedI18n } from "@/locales/server";

export default async function Page() {
	const t = await getScopedI18n("contact.thanks");
	return (
		<PopUp
			succeed={true}
			heading={t("heading")}
			subText={t("subText")}
			buttonText={t("buttonText")}
			link='/'
		/>
	);
}
