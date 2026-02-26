import Link from "next/link";
import Image from "next/image";
import { Clock, ChefHat } from "lucide-react";
import type { ContentItem, ContentType } from "@/lib/mdx";

interface ArticleCardProps {
  article: ContentItem;
  type: ContentType;
}

export function ArticleCard({ article, type }: ArticleCardProps) {
  return (
    <Link
      href={`/${type}/${article.slug}/`}
      className="group overflow-hidden rounded-xl border border-warm-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-warm-700 backdrop-blur-sm">
          {article.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-warm-900 line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-warm-500 line-clamp-2">
          {article.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-warm-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime} min
          </span>
          {article.difficulty && (
            <span className="flex items-center gap-1">
              <ChefHat className="h-3.5 w-3.5" />
              {article.difficulty}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
