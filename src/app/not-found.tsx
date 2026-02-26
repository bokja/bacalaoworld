import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="font-display text-5xl font-bold text-warm-900">404</h1>
      <p className="mt-4 text-lg text-warm-600">
        Denne siden finnes ikke. Kanskje den ble spist opp?
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-warm-600 px-6 py-3 font-semibold text-white hover:bg-warm-700"
      >
        Tilbake til forsiden
      </Link>
    </div>
  );
}
