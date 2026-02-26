import Link from "next/link";
import { getAllContent } from "@/lib/mdx";
import { ArticleCard } from "@/components/articles/ArticleCard";

export default function HomePage() {
  const recipes = getAllContent("oppskrifter");
  const articles = getAllContent("artikler");
  const featuredRecipes = recipes.filter((r) => r.featured).slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-warm-900 py-20 md:py-28">
        <div className="container relative z-10 text-center">
          <h1 className="font-display text-4xl font-bold text-warm-50 md:text-6xl">
            Alt om bacalao og klippfisk
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-warm-300">
            Oppskrifter, historie og tips om en av Norges mest elskede retter.
            Fra tradisjonell festmat til hverdagsmiddager.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/oppskrifter/"
              className="rounded-lg bg-warm-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-warm-700"
            >
              Se oppskrifter
            </Link>
            <Link
              href="/artikler/"
              className="rounded-lg border border-warm-400 px-6 py-3 font-semibold text-warm-200 transition-colors hover:bg-warm-800"
            >
              Les artikler
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section className="container py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold text-warm-900">
              Populære oppskrifter
            </h2>
            <Link
              href="/oppskrifter/"
              className="text-sm font-medium text-warm-600 hover:text-warm-800"
            >
              Se alle &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRecipes.map((recipe) => (
              <ArticleCard
                key={recipe.slug}
                article={recipe}
                type="oppskrifter"
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="bg-warm-100 py-16">
          <div className="container">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl font-semibold text-warm-900">
                Siste artikler
              </h2>
              <Link
                href="/artikler/"
                className="text-sm font-medium text-warm-600 hover:text-warm-800"
              >
                Se alle &rarr;
              </Link>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  type="artikler"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About blurb */}
      <section className="container py-16 text-center">
        <h2 className="font-display text-2xl font-semibold text-warm-900">
          Om BacalaoWorld
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-warm-600">
          BacalaoWorld er din kilde til alt om bacalao og klippfisk. Vi deler
          oppskrifter, historie og tips slik at du kan lage den perfekte
          bacalao hjemme. Enten du er nybegynner eller erfaren kokk, finner du
          noe for deg her.
        </p>
      </section>
    </>
  );
}
