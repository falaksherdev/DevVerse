import Link from "next/link";
import { PenSquare, Search } from "lucide-react";
import { auth } from "@/lib/auth";
import { SITE_NAME } from "@/lib/constants";
import ThemeToggle from "@/components/layout/ThemeToggle";
import UserMenu from "@/components/layout/UserMenu";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            {SITE_NAME[0]}
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:block">
            {SITE_NAME}
          </span>
        </Link>

        <form
          action="/search"
          role="search"
          className="mx-auto hidden w-full max-w-md md:block"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Search posts..."
              className="input pl-9"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <Link
            href="/search"
            aria-label="Search"
            className="btn-icon md:hidden"
          >
            <Search className="h-5 w-5" />
          </Link>

          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/posts/new"
                className="btn btn-primary ml-1 hidden sm:inline-flex"
              >
                <PenSquare className="h-4 w-4" /> Write
              </Link>
              <div className="ml-1">
                <UserMenu
                  name={user.name ?? ""}
                  username={user.username}
                  email={user.email ?? ""}
                  image={user.image}
                />
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
