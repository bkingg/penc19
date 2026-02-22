import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { z } from "zod";

// Zod schema
const admissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  language: z.enum(["en", "fr"]).default("fr"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = admissionSchema.parse(body);

    // Generate QR code as PNG buffer
    const qrString = `Admission: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}`;
    const qrBuffer = await QRCode.toBuffer(qrString);

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // should be App Password if 2FA is on
      },
    });

    // Email subject
    const subject =
      data.language === "fr"
        ? "Votre admission à la galerie d'art"
        : "Your Art Gallery Admission";

    // Email HTML with embedded QR code
    const bodyHtml =
      data.language === "fr"
        ? `<h2>Bonjour ${data.name}</h2>
         <p>Merci pour votre réservation !</p>
         <p>Présentez ce QR code à l'entrée :</p>
         <img src="cid:qrimage"/>`
        : `<h2>Hello ${data.name}</h2>
         <p>Thank you for your reservation!</p>
         <p>Show this QR code at the entrance:</p>
         <img src="cid:qrimage"/>`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      subject,
      html: bodyHtml,
      attachments: [
        {
          filename: "qr.png",
          content: qrBuffer,
          cid: "qrimage", // must match src="cid:qrimage"
        },
      ],
    });

    // Return QR Base64 for browser preview
    return NextResponse.json({
      message: "Admission sent!",
      qrBase64: `data:image/png;base64,${qrBuffer.toString("base64")}`,
    });
  } catch (err: unknown) {
    console.error(err);

    // Narrow the type
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to process admission" },
      { status: 500 },
    );
  }
}
