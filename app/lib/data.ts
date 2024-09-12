import { createClient } from "contentful";
import { notFound } from "next/navigation";

const client = createClient({
	space: process.env.CF_SPACE_ID as string,
	accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN as string,
});

export async function getEntries(contentType: string) {
	try {
		const entries = await client.getEntries({ content_type: contentType });
		if (entries.items.length) return entries.items;
	} catch (error) {
		notFound();
		throw new Error(`Failed to get entries: ${error}`);
	}
}

export async function getEntry(id: string) {
	try {
		const entry = await client.getEntry(id);
		return entry;
	} catch (error) {
		throw new Error(`Failed to get entry: ${error}`);
	}
}
