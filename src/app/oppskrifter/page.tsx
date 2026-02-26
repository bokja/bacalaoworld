import type { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";
import { ArticleCard } from "@/components/articles/ArticleCard";

export const metadata: Metadata = {
  title: "Bacalao-oppskrifter – Klassisk og kreativt",
  description:
    "Samling av de beste bacalao-oppskriftene. Klassisk norsk bacalao, grateng, a la vizcaína og mer.",
  alternates: { canonical: "/oppskrifter/" },
};

export default function OppskrifterPage() {
  const recipes = getAllContent("oppskrifter");

  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl font-bold text-warm-900">
        Oppskrifter
      </h1>
      <p className="mt-4 text-lg text-warm-600">
        Alle våre bacalao-oppskrifter – fra klassisk til kreativ.
      </p>
      {recipes.length > 0 ? (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <ArticleCard
              key={recipe.slug}
              article={recipe}
              type="oppskrifter"
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-warm-500">
          Oppskrifter kommer snart. Følg med!
        </p>
      )}
    </div>
  );
}
