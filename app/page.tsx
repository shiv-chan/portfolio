import { documentToReactComponents as renderRichText } from "@contentful/rich-text-react-renderer";
import { options } from "@/app/lib/utils";
import { getEntries } from "./lib/data";
import { Document } from "@contentful/rich-text-types";

export default async function Home() {
	const document = await getEntries("summary");
	return (
		<div className='mx-8 pb-20 2xl:pt-8 text-lavender'>
			{document &&
				renderRichText(document[0].fields.summary as Document, options)}
		</div>
	);
}
