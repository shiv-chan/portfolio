import PopUp from "@/app/ui/contact/popup";
import { getScopedI18n } from "@/locales/server";

export default async function NotFoundCatchAll() {
	const t = await getScopedI18n("notFound");
	return (
		<div className='text-lavender mx-8 pb-20 2xl:pt-8'>
			<PopUp
				succeed={false}
				heading={t("heading")}
				subText={t("subText")}
				buttonText={t("buttonText")}
				link='/'
			/>
		</div>
	);
}
