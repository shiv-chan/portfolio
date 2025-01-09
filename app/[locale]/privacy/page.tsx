import { getScopedI18n, getCurrentLocale } from "@/locales/server";
import { getPrivacyPolicy } from "@/app/lib/data";
import { options, locales, formatDate } from "@/app/lib/utils";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";

export default async function Page() {
    const locale = await getCurrentLocale();
    const t = await getScopedI18n("privacyPolicy");

    const data = await getPrivacyPolicy(locales[locale]);
    const effectiveDate = formatDate(data.effectiveDate, locale, true);
    const terms: Document = data.terms.json;

    return (<main className="mx-8 pb-20 2xl:pt-8 text-lavender">
        <div className="mb-4">
            <h2 className="mb-4 text-xl uppercase font-bold">{t("heading")}</h2>
            <p className="mb-4 font-light font-base leading-relaxed">{t("effectiveDate")}: {effectiveDate}</p>
            <p className="mb-2 font-light font-base leading-relaxed">{t("text")}</p>
        </div>
        <div className="mb-4">
            {terms && renderRichText(terms, options)}
        </div>
    </main>);
}