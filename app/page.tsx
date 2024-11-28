import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { options } from "@/app/lib/utils";
import { getEntries } from "./lib/data";
import { Document } from "@contentful/rich-text-types";
import Summary from "./ui/summary";

export default async function Home() {
	const document = await getEntries("summary");
	const summary = document && (document[0].fields.summary as Document);
	return <Summary summary={summary} />;
}
