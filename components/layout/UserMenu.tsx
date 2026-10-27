"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, LogOut, User } from "lucide-react";
import { logoutUser } from "@/lib/actions/auth";

type UserMenuProps = {
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export default function UserMenu({
  name,
  username,
  email,
  image,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const initial = (name || username || "U")[0].toUpperCase();

  const itemClass =
    "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition hover:bg-muted";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Open user menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-accent text-sm font-semibold text-accent-foreground ring-2 ring-transparent transition hover:ring-primary"
      >
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-xl border border-border bg-card p-1.5 shadow-lg"
        >
          <div className="border-b border-border px-3 py-2.5">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-muted-foreground">
              @{username}
            </p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>

          <div className="py-1.5">
            <Link
              href={`/profile/${username}`}
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <User className="h-4 w-4" /> Profile
            </Link>
            <Link
              href="/bookmarks"
              onClick={() => setOpen(false)}
              className={itemClass}
            >
              <Bookmark className="h-4 w-4" /> Bookmarks
            </Link>
          </div>

          <form action={logoutUser} className="border-t border-border pt-1.5">
            <button type="submit" className={`${itemClass} text-danger`}>
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
