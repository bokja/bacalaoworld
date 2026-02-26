import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface ArticleHeaderProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  readingTime: number;
  category: string;
  backHref: string;
  backLabel: string;
}

export function ArticleHeader({
  title,
  description,
  image,
  imageAlt,
  date,
  readingTime,
  category,
  backHref,
  backLabel,
}: ArticleHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-warm-900">
      <div className="container py-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-warm-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <div className="mt-6 max-w-3xl">
          <span className="inline-block rounded-full bg-warm-600 px-3 py-1 text-xs font-medium text-white">
            {category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-warm-300">{description}</p>
          <div className="mt-6 flex items-center gap-5 text-sm text-warm-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {readingTime} min lesetid
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="relative aspect-[2/1] overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
    </div>
  );
}
