"use client";

// Mirrors MainTabView's 4-tab structure: Following (0), Discover (1),
// Wire (2), Profile (3).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../lib/store";

const TABS = [
  { href: "/", label: "Following" },
  { href: "/discover", label: "Discover" },
  { href: "/wire", label: "Wire" },
  { href: "/profile", label: "Profile" },
];

export default function TabBar() {
  const pathname = usePathname();
  const { wireAtoms } = useStore();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-bg-primary">
      <div className="mx-auto flex max-w-md">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const showWireBadge = tab.href === "/wire" && wireAtoms.length > 0;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex-1 py-3 text-center text-[12px] font-medium ${
                active ? "text-primary-blue" : "text-text-secondary"
              }`}
            >
              {tab.label}
              {showWireBadge && (
                <span className="absolute right-[18%] top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {wireAtoms.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
