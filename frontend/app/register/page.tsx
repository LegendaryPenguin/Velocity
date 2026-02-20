"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Enter your name";
    if (!email.trim()) e.email = "Enter your email or mobile phone number";
    else if (!email.includes("@") && !/^\d{10,}$/.test(email.replace(/\D/g, "")))
      e.email = "Enter a valid email or phone number";
    if (!password) e.password = "Enter a password";
    else if (password.length < 6) e.password = "Passwords must be at least 6 characters";
    if (!rePassword) e.rePassword = "Re-enter your password";
    else if (password !== rePassword) e.rePassword = "Passwords must match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError = (field: string) => setErrors((p) => { const n = { ...p }; delete n[field]; return n; });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    localStorage.setItem("velocart_user", name.trim());
    setTimeout(() => router.push("/captcha"), 600);
  };

  const inputCls = (field: string) =>
    `mb-1 w-full rounded-[3px] border px-[7px] py-[3px] text-sm text-gray-900 shadow-inner outline-none focus:ring-1 ${errors[field] ? "border-red-500 focus:border-red-500 focus:ring-red-300" : "border-gray-400 focus:border-orange-400 focus:ring-orange-300"}`;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex justify-center pb-4 pt-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          <span className="text-orange-400">Velo</span>Cart
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[350px] px-4">
        <div className="rounded-lg border border-gray-300 p-5">
          <h1 className="mb-5 text-[28px] font-normal text-gray-900">Create Account</h1>

          <form onSubmit={handleSubmit} noValidate>
            <label className="mb-1 block text-sm font-bold text-gray-900">Your name</label>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); clearError("name"); }} className={inputCls("name")} autoFocus />
            {errors.name && <p className="mb-2 text-xs text-red-600">{errors.name}</p>}
            {!errors.name && <div className="mb-3" />}

            <label className="mb-1 block text-sm font-bold text-gray-900">Email or mobile phone number</label>
            <input type="text" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email"); }} className={inputCls("email")} />
            {errors.email && <p className="mb-2 text-xs text-red-600">{errors.email}</p>}
            {!errors.email && <div className="mb-3" />}

            <label className="mb-1 block text-sm font-bold text-gray-900">Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearError("password"); }} className={inputCls("password")} />
            {errors.password && <p className="mb-2 text-xs text-red-600">{errors.password}</p>}
            {!errors.password && <div className="mb-3" />}

            <label className="mb-1 block text-sm font-bold text-gray-900">Re-enter password</label>
            <input type="password" value={rePassword} onChange={(e) => { setRePassword(e.target.value); clearError("rePassword"); }} className={inputCls("rePassword")} />
            {errors.rePassword && <p className="mb-1 text-xs text-red-600">{errors.rePassword}</p>}
            <p className="mb-4 text-xs text-gray-500">Passwords must be at least 6 characters.</p>

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
            By creating an account, you agree to VeloCart&apos;s{" "}
            <span className="cursor-pointer text-cyan-700 hover:text-orange-700 hover:underline">Conditions of Use</span>{" "}
            and{" "}
            <span className="cursor-pointer text-cyan-700 hover:text-orange-700 hover:underline">Privacy Notice</span>.
          </p>

          <div className="border-t border-gray-200 pt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/signin" className="text-cyan-700 hover:text-orange-700 hover:underline">Sign in</Link>
            <span className="mx-2 text-gray-400">|</span>
            Buying for work?{" "}
            <span className="cursor-pointer text-cyan-700 hover:text-orange-700 hover:underline">Create a free business account</span>
          </div>
        </div>
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
