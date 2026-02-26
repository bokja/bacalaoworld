import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-100">
      <div className="container py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-lg font-bold text-warm-900"
            >
              BacalaoWorld
            </Link>
            <p className="mt-1 text-sm text-warm-500">
              Alt om bacalao og klippfisk
            </p>
          </div>

          <nav className="flex gap-6 text-sm text-warm-500">
            <Link href="/oppskrifter/" className="hover:text-warm-700">
              Oppskrifter
            </Link>
            <Link href="/artikler/" className="hover:text-warm-700">
              Artikler
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-warm-200 pt-6 text-center text-xs text-warm-400">
          &copy; {new Date().getFullYear()} BacalaoWorld. Alle rettigheter
          reservert.
        </div>
      </div>
    </footer>
  );
}
