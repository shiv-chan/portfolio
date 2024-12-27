import { getSummary } from "../lib/data";
import Summary from "@/app/ui/summary";
import { getCurrentLocale } from "@/locales/server";
import { locales } from "@/app/lib/utils";

export default async function Home() {
	const locale = await getCurrentLocale();
	const summary = await getSummary(locales[locale]);
	return <Summary summary={summary} />;
}
