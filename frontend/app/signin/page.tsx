"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Enter your email or mobile phone number";
    else if (!email.includes("@") && !/^\d{10,}$/.test(email.replace(/\D/g, "")))
      e.email = "Enter a valid email or phone number";
    if (!password) e.password = "Enter your password";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const name = email.split("@")[0] || "User";
    localStorage.setItem("velocart_user", name.charAt(0).toUpperCase() + name.slice(1));
    setTimeout(() => router.push("/captcha"), 600);
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
          <h1 className="mb-5 text-[28px] font-normal text-gray-900">Sign in</h1>

          <form onSubmit={handleSubmit} noValidate>
            <label className="mb-1 block text-sm font-bold text-gray-900">
              Email or mobile phone number
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              className={`mb-1 w-full rounded-[3px] border px-[7px] py-[3px] text-sm text-gray-900 shadow-inner outline-none focus:ring-1 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-300" : "border-gray-400 focus:border-orange-400 focus:ring-orange-300"}`}
              autoFocus
            />
            {errors.email && <p className="mb-3 text-xs text-red-600">{errors.email}</p>}
            {!errors.email && <div className="mb-3" />}

            <label className="mb-1 block text-sm font-bold text-gray-900">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              className={`mb-1 w-full rounded-[3px] border px-[7px] py-[3px] text-sm text-gray-900 shadow-inner outline-none focus:ring-1 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-300" : "border-gray-400 focus:border-orange-400 focus:ring-orange-300"}`}
            />
            {errors.password && <p className="mb-4 text-xs text-red-600">{errors.password}</p>}
            {!errors.password && <div className="mb-4" />}

            <button
              type="submit"
              disabled={loading}
              className="mb-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-b from-yellow-300 to-yellow-400 py-[6px] text-sm font-medium text-gray-900 shadow-sm transition hover:from-yellow-400 hover:to-yellow-500 disabled:opacity-60"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin text-gray-700" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              ) : "Continue"}
            </button>
          </form>

          <p className="mb-4 text-xs leading-relaxed text-gray-700">
            By continuing, you agree to VeloCart&apos;s{" "}
            <span className="cursor-pointer text-cyan-700 hover:text-orange-700 hover:underline">Conditions of Use</span>{" "}
            and{" "}
            <span className="cursor-pointer text-cyan-700 hover:text-orange-700 hover:underline">Privacy Notice</span>.
          </p>

          <details className="mb-2">
            <summary className="cursor-pointer text-sm text-gray-700">
              <span className="ml-1 text-cyan-700 hover:text-orange-700 hover:underline">Need help?</span>
            </summary>
            <div className="ml-4 mt-1 space-y-1 text-sm text-cyan-700">
              <Link href="/forgot-password" className="block hover:text-orange-700 hover:underline">Forgot your password?</Link>
              <p className="cursor-pointer hover:text-orange-700 hover:underline">Other issues with Sign-In</p>
            </div>
          </details>
        </div>

        <div className="relative my-5 flex items-center">
          <div className="flex-1 border-t border-gray-300" />
          <span className="px-3 text-xs text-gray-500">New to VeloCart?</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        <Link
          href="/register"
          className="block w-full rounded-lg border border-gray-400 bg-gradient-to-b from-gray-50 to-gray-200 py-[6px] text-center text-sm font-medium text-gray-900 shadow-sm hover:from-gray-100 hover:to-gray-250"
        >
          Create your VeloCart account
        </Link>
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
