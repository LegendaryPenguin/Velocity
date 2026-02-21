"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/faucet", label: "0G Faucet" },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/25 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/dashboard" className="text-sm font-semibold tracking-wide title-gradient">
          0G Velocity Studio
        </Link>
        <nav className="flex gap-2">
          {links.map((link) => {
            const active = pathname === link.href || (link.href === "/dashboard" && pathname.startsWith("/modules"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-xs transition ${
                  active ? "bg-indigo-500 text-white" : "text-white/70 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
