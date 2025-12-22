"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import fr from "react-phone-input-2/lang/fr.json";
import "react-phone-input-2/lib/bootstrap.css";

type FormData = z.infer<typeof schema>;

// Define the schema using Zod
const schema = z.object({
  name: z.string().min(1, { message: "Veuillez saisir votre nom" }),
  email: z
    .string()
    .min(1, { message: "Veuillez saisir une adresse email" })
    .email({ message: "Veuillez saisir une adresse email valide" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Veuillez saisir un numéro valide" }),
  message: z.string().min(1, { message: "Veuillez saisir votre message" }),
});

export default function ContactForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema), // Use Zod schema for validation
  });

  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setFeedbackMessage(null);
    // Handle form submission, e.g., send data to an API endpoint
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFeedbackMessage("Le message a été envoyé!");
        reset();
      } else {
        setFeedbackMessage("Veuillez Rééssayer");
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="needs-validation"
      noValidate
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label visually-hidden">
          Name
        </label>
        <input
          id="name"
          placeholder="Nom"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name")}
          required
        />
        {errors.name && (
          <p className="invalid-feedback">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label visually-hidden">
          Email
        </label>
        <input
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="invalid-feedback">{errors.email.message}</p>
        )}
      </div>

      <div className={`mb-3 ${errors.phoneNumber ? "is-invalid" : ""}`}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="telephone" className="form-label visually-hidden">
                Téléphone
              </label>
              <PhoneInput
                {...field}
                country={"sn"} // Default country, change as needed
                onChange={(value) => field.onChange(value)}
                inputClass={errors.phoneNumber ? "is-invalid" : ""}
                placeholder="221 77 123 45 67"
                buttonClass="btn"
                countryCodeEditable={false} // You can set this to true if you want users to edit the code
                localization={fr}
              />
              {errors.phoneNumber && (
                <p className="invalid-feedback">{errors.phoneNumber.message}</p>
              )}
            </>
          )}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label visually-hidden">
          Message
        </label>
        <textarea
          id="message"
          className={`form-control ${errors.message ? "is-invalid" : ""}`}
          {...register("message")}
          rows={8}
          placeholder="Message"
        />
        {errors.message && (
          <p className="invalid-feedback">{errors.message.message}</p>
        )}
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}{" "}
          Envoyer
        </button>
      </div>
      {feedbackMessage && <p className="text-success">{feedbackMessage}</p>}
    </form>
  );
}
