import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const { CF_REVALIDATE_SECRET } = process.env;

export async function POST(request: Request) {
	const requestHeaders = new Headers(request.headers);
	const secret = requestHeaders.get("x-vercel-reval-key");
	const tag = requestHeaders.get("tag");

	if (secret !== CF_REVALIDATE_SECRET) {
		return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
	}

	switch (tag) {
		case "about": {
			revalidateTag("about");
			break;
		}
		case "works": {
			revalidateTag("works");
			break;
		}
		default:
			return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
	}

	return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
