"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    if (!token) return;

    fetch("/api/paydunya/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Donation successful ❤️");
        } else {
          setMessage("Payment not completed.");
        }
      });
  }, [token]);

  return (
    <div className="container py-5 text-center">
      <h3>{message}</h3>
    </div>
  );
}
