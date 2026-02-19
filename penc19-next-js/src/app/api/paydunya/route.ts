import { NextResponse } from "next/server";
import { z } from "zod";

const donationSchema = z.object({
  name: z.string(),
  amount: z.coerce.number(),
  language: z.enum(["fr", "en"]),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = donationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 },
      );
    }

    const { name, amount, language } = parsed.data;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const baseUrlEndpoint =
      process.env.PAYDUNYA_MODE === "production"
        ? process.env.PAYDUNYA_PROD_URL
        : process.env.PAYDUNYA_SANDBOX_URL;
    const privateKey =
      process.env.PAYDUNYA_MODE === "production"
        ? process.env.PAYDUNYA_PROD_PRIVATE_KEY
        : process.env.PAYDUNYA_SANDBOX_PRIVATE_KEY;
    const token =
      process.env.PAYDUNYA_MODE === "production"
        ? process.env.PAYDUNYA_PROD_TOKEN
        : process.env.PAYDUNYA_SANDBOX_TOKEN;

    console.log("base", baseUrlEndpoint);

    const response = await fetch(`${baseUrlEndpoint}/checkout-invoice/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY!,
        "PAYDUNYA-PRIVATE-KEY": privateKey!,
        "PAYDUNYA-TOKEN": token!,
      },
      body: JSON.stringify({
        invoice: {
          total_amount: amount,
          description: "Donation",
          customer: {
            name: name,
          },
        },
        store: {
          name: "Penc 19",
          tagline: "Supporting communities",
        },
        actions: {
          cancel_url: `${baseUrl}/${language}/donate`,
          return_url: `${baseUrl}/${language}/donate/success`,
          callback_url: `${baseUrl}/api/paydunya/callback`,
        },
      }),
    });

    const data = await response.json();

    if (data.response_code !== "00") {
      return NextResponse.json({ error: data.response_text }, { status: 400 });
    }

    return NextResponse.json({
      url: data.response_text,
      token: data.token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 },
    );
  }
}
