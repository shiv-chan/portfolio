import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const { CF_REVALIDATE_SECRET } = process.env;
import { tags } from "@/app/lib/data";

export async function POST(request: Request) {
	const requestHeaders = new Headers(request.headers);
	const secret = requestHeaders.get("x-vercel-reval-key");
	const tag = requestHeaders.get("tag");

	if (secret !== CF_REVALIDATE_SECRET) {
		return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
	}

	const revalidatedResponse = (tag: string) =>
		NextResponse.json({ revalidated: true, tag, now: Date.now() });

	if (tag && tags.includes(tag)) {
		revalidateTag(tag);
		return revalidatedResponse(tag);
	} else {
		return NextResponse.json({ error: "Invalid tag" }, { status: 400 });
	}
}
