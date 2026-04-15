import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email || !EMAIL_RE.test(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    const metadata = {
      firstName: body.firstName || "Someone",
      message: body.message || "",
    };
    try {
      await sendContactEmail(body.email, metadata);
    } catch (err) {
      console.error("Contact email error:", err);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
