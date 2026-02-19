import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const baseUrlEndpoint =
      process.env.PAYDUNYA_MODE === "production"
        ? process.env.PAYDUNYA_PROD_URL
        : process.env.PAYDUNYA_SANDBOX_URL;

    const response = await fetch(
      `${baseUrlEndpoint}/checkout-invoice/confirm/${token}`,
      {
        method: "GET",
        headers: {
          "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY!,
          "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY!,
          "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN!,
        },
      },
    );

    const data = await response.json();

    /**
     * Example response:
     * {
     *   status: "completed",
     *   total_amount: 5000,
     *   customer: { name, email, phone },
     *   invoice_token: "XXXX"
     * }
     */

    if (data.status === "completed") {
      // ✅ IMPORTANT: prevent double insert (see below)
      // Save donation to DB here

      return NextResponse.json({
        success: true,
        amount: data.total_amount,
        customer: data.customer,
      });
    }

    return NextResponse.json({
      success: false,
      status: data.status,
    });
  } catch (error) {
    console.error("Verification error:", error);

    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
