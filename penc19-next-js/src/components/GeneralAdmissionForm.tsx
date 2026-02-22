// components/AdmissionForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo } from "react";

type AdmissionFormProps = {
  language?: string;
};

export default function AdmissionForm({ language = "fr" }: AdmissionFormProps) {
  const messages = useMemo(() => {
    return language === "fr"
      ? {
          nameRequired: "Le nom est requis",
          nameMin: "Le nom doit comporter au moins 2 caractères",
          emailRequired: "L'email est requis",
          emailInvalid: "Adresse e-mail invalide",
          phoneInvalid: "Numéro de téléphone invalide",
          submit: "Obtenir l'admission",
          processing: "Traitement...",
          success: "Admission envoyée ! Vérifiez votre email.",
          error: "Une erreur est survenue",
        }
      : {
          nameRequired: "Name is required",
          nameMin: "Name must be at least 2 characters",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email address",
          phoneInvalid: "Invalid phone number",
          submit: "Get Admission",
          processing: "Processing...",
          success: "Admission sent! Check your email.",
          error: "Something went wrong",
        };
  }, [language]);

  const admissionSchema = useMemo(() => {
    return z.object({
      name: z
        .string({ required_error: messages.nameRequired })
        .min(2, messages.nameMin),
      email: z
        .string({ required_error: messages.emailRequired })
        .email(messages.emailInvalid),
      phone: z
        .string()
        .optional()
        .refine(
          (val) => !val || /^\+?[0-9]{7,15}$/.test(val),
          messages.phoneInvalid,
        ),
    });
  }, [messages]);

  type FormData = z.infer<typeof admissionSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(admissionSchema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/general-admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(messages.success);
        reset();
      } else {
        setSuccess(result.error || messages.error);
      }
    } catch {
      setSuccess(messages.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title mb-4">
            {language === "fr"
              ? "Admission à la galerie d'art"
              : "Art Gallery Admission"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                {language === "fr" ? "Nom complet" : "Full Name"}
              </label>
              <input
                type="text"
                id="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name")}
                placeholder={language === "fr" ? "Nom complet" : "Full Name"}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email")}
                placeholder="Email"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                {language === "fr"
                  ? "Téléphone (optionnel)"
                  : "Phone (optional)"}
              </label>
              <input
                type="text"
                id="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone")}
                placeholder={
                  language === "fr"
                    ? "Téléphone (optionnel)"
                    : "Phone (optional)"
                }
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? messages.processing : messages.submit}
            </button>
          </form>

          {success && (
            <div className="alert alert-success mt-3" role="alert">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
