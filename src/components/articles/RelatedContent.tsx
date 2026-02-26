import { ArticleCard } from "./ArticleCard";
import type { ContentItem, ContentType } from "@/lib/mdx";

interface RelatedContentProps {
  items: (ContentItem & { type: ContentType })[];
}

export function RelatedContent({ items }: RelatedContentProps) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-warm-200 bg-warm-50">
      <div className="container py-12">
        <h2 className="font-display text-2xl font-bold text-warm-900">
          Relatert innhold
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ArticleCard
              key={`${item.type}-${item.slug}`}
              article={item}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
