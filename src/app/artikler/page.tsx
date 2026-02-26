import type { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";
import { ArticleCard } from "@/components/articles/ArticleCard";

export const metadata: Metadata = {
  title: "Artikler om bacalao og klippfisk",
  description:
    "Les om historien, tradisjonene og tipsene bak bacalao og klippfisk. Alt du trenger å vite.",
  alternates: { canonical: "/artikler/" },
};

export default function ArtiklerPage() {
  const articles = getAllContent("artikler");

  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl font-bold text-warm-900">
        Artikler
      </h1>
      <p className="mt-4 text-lg text-warm-600">
        Historie, tips og guider om bacalao og klippfisk.
      </p>
      {articles.length > 0 ? (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              type="artikler"
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-warm-500">
          Artikler kommer snart. Følg med!
        </p>
      )}
    </div>
  );
}
