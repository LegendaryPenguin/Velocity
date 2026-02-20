"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Enter your email or mobile phone number"); return; }
    if (!email.includes("@") && !/^\d{10,}$/.test(email.replace(/\D/g, ""))) {
      setError("Enter a valid email or phone number"); return;
    }
    setSent(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex justify-center pb-4 pt-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          <span className="text-orange-400">Velo</span>Cart
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[350px] px-4">
        <div className="rounded-lg border border-gray-300 p-5">
          <h1 className="mb-2 text-[28px] font-normal text-gray-900">Password assistance</h1>
          <p className="mb-5 text-sm text-gray-600">
            Enter the email address or mobile phone number associated with your VeloCart account.
          </p>

          {sent ? (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-bold">Check your email</p>
              <p className="mt-1 text-emerald-700">
                We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
              </p>
              <Link href="/signin" className="mt-3 inline-block text-sm font-medium text-cyan-700 hover:text-orange-700 hover:underline">
                Back to Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label className="mb-1 block text-sm font-bold text-gray-900">Email or mobile phone number</label>
              <input
                type="text"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className={`mb-1 w-full rounded-[3px] border px-[7px] py-[3px] text-sm text-gray-900 shadow-inner outline-none focus:ring-1 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-300" : "border-gray-400 focus:border-orange-400 focus:ring-orange-300"}`}
                autoFocus
              />
              {error && <p className="mb-3 text-xs text-red-600">{error}</p>}
              {!error && <div className="mb-4" />}

              <button
                type="submit"
                className="mb-4 w-full rounded-lg bg-gradient-to-b from-yellow-300 to-yellow-400 py-[6px] text-sm font-medium text-gray-900 shadow-sm transition hover:from-yellow-400 hover:to-yellow-500"
              >
                Continue
              </button>
            </form>
          )}
        </div>

        {!sent && (
          <p className="mt-4 text-center text-sm text-gray-600">
            <Link href="/signin" className="text-cyan-700 hover:text-orange-700 hover:underline">Return to Sign in</Link>
          </p>
        )}
      </div>

      <div className="mt-auto">
        <div className="mx-auto mt-8 h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="flex justify-center gap-6 py-3 text-[11px] text-cyan-700">
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Conditions of Use</span>
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Privacy Notice</span>
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Help</span>
        </div>
        <p className="pb-4 text-center text-[11px] text-gray-500">&copy; 2026 VeloCart, Inc. or its affiliates.</p>
      </div>
    </div>
  );
}
