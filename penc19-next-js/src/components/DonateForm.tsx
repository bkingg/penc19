"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const presetAmounts = [2000, 5000, 10000, 25000];

const donationSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    presetAmount: z.union([z.coerce.number(), z.literal("other")]).optional(),
    customAmount: z.coerce.number().optional(),
    language: z.string(),
  })
  .refine(
    (data) =>
      (data.presetAmount &&
        data.presetAmount !== "other" &&
        !data.customAmount) ||
      (data.presetAmount === "other" && data.customAmount) ||
      (!data.presetAmount && data.customAmount),
    {
      message: "Select a preset amount or enter a custom amount",
      path: ["presetAmount"],
    },
  );

type DonationFormData = z.infer<typeof donationSchema>;

export default function DonateForm({ language }: { language: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: { language },
  });

  const customAmount = watch("customAmount");

  const onSubmit = async (data: DonationFormData) => {
    const amount =
      data.presetAmount === "other" ? data.customAmount! : data.presetAmount!;
    console.log("amount", amount);
    try {
      const res = await fetch("/api/paydunya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          amount,
          language: data.language,
        }),
      });

      const result = await res.json();
      if (result.url) window.location.href = result.url;
      else alert(result.error || "Payment initialization failed");
    } catch {
      alert(
        language === "fr" ? "Une erreur est survenue" : "Something went wrong",
      );
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">
          {language === "fr" ? "Faire un don" : "Donate"}
        </h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder={language === "fr" ? "Votre nom" : "Your name"}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-danger small">{errors.name.message}</p>
          )}

          {/* Preset amounts */}
          {presetAmounts.map((amount) => (
            <div className="form-check mb-2" key={amount}>
              <input
                type="radio"
                id={`preset-${amount}`}
                value={amount.toString()}
                {...register("presetAmount")}
                className="form-check-input"
                disabled={!!customAmount}
              />
              <label htmlFor={`preset-${amount}`} className="form-check-label">
                {amount.toLocaleString([language])} FCFA
              </label>
            </div>
          ))}

          <div className="form-check mb-2" key="other">
            <input
              type="radio"
              id="preset-other"
              value="other"
              {...register("presetAmount")}
              className="form-check-input"
            />
            <label htmlFor="preset-other" className="form-check-label">
              {language === "fr"
                ? "Autre montant (min 1000)"
                : "Other amount (min 1000)"}
            </label>
          </div>

          {errors.presetAmount && (
            <p className="text-danger small">{errors.presetAmount.message}</p>
          )}

          {/* Custom amount */}
          <input
            type="number"
            className="form-control mt-3"
            placeholder={
              language === "fr"
                ? "Autre montant (min 1000)"
                : "Other amount (min 1000)"
            }
            {...register("customAmount")}
            disabled={watch("presetAmount") !== "other"}
          />
          {errors.customAmount && (
            <p className="text-danger small">{errors.customAmount.message}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? language === "fr"
                ? "Redirection..."
                : "Redirecting..."
              : language === "fr"
                ? "Faire un don"
                : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
