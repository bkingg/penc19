import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("PayDunya Callback:", body);

  // TODO:
  // - Verify payment status
  // - Save donation in DB
  // - Send confirmation email

  return NextResponse.json({ success: true });
}
