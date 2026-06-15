import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const type = body?._type;
    if (!type) {
      return new NextResponse("Bad Request: missing _type", { status: 400 });
    }

    // Purge every route under the root layout (home + all property pages),
    // so any publish reflects immediately.
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, type, now: Date.now() });
  } catch (err) {
    console.error("Revalidate webhook error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
