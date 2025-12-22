import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Send Email
    const { name, email, phoneNumber, message } = req.body;
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Office 365 email address
        pass: process.env.GMAIL_PASS, // Your Office 365 app password
      },
    });

    // Set up email data with unicode symbols
    const mailOptions = {
      from: `"FKT Consulting" <${process.env.GMAIL_USER}>`, // Sender's address
      replyTo: email,
      to: process.env.GMAIL_USER, // Receiver's address
      subject: "Formulaire de Contact", // Subject line
      text: `Nom: ${name}
            Email: ${email}
            Numéro de téléphone: ${phoneNumber}
            Message:
            ${message}
            `, // Plain text body
      html: `<h4>Nom:</h4><p>${name}</p><h4>Email:</h4><p>${email}</p><h4>Numéro de Téléphone:</h4><p>${phoneNumber}</p><h4>Message:</h4><p>${message}</p>`, // HTML body content
    };

    try {
      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Email envoyé avec succès" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi de l'Email",
        error,
      });
    }

    res
      .status(200)
      .json({ message: "Votre formulaire a été envoyé avec succès" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
