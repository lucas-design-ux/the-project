import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
    try {
        const signature = request.headers.get("x-webhook-secret");
        const secret = process.env.WEBFLOW_WEBHOOK_SECRET;

        if (!signature || signature !== secret) {
            return NextResponse.json(
                { message: "Invalid secret" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const tag = body.tagToRevalidate;

        if (tag) {
            revalidateTag(tag, "/");
            return NextResponse.json({ revalidated: true, now: Date.now() });
        }

        return NextResponse.json({
            revalidated: false,
            now: Date.now(),
            message: "Missing tagToRevalidate",
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Error revalidating" },
            { status: 500 }
        );
    }
}
