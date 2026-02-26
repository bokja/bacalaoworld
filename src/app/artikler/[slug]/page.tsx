import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlugs, getCompiledMDX, getFrontmatter } from "@/lib/mdx";
import { ArticleHeader } from "@/components/articles/ArticleHeader";
import { JsonLd } from "@/components/seo/JsonLd";

const baseUrl = "https://bacalaoworld.no";

export function generateStaticParams() {
  return getSlugs("artikler").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const fm = getFrontmatter("artikler", params.slug);
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `/artikler/${params.slug}/` },
      openGraph: {
        type: "article",
        title: fm.title,
        description: fm.description,
        images: [
          {
            url: `${baseUrl}${fm.image}`,
            width: 1200,
            height: 630,
            alt: fm.imageAlt,
          },
        ],
        publishedTime: fm.date,
        modifiedTime: fm.updatedDate || fm.date,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let compiled;
  try {
    compiled = await getCompiledMDX("artikler", params.slug);
  } catch {
    notFound();
  }

  const { content, frontmatter, readingTime } = compiled;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: `${baseUrl}${frontmatter.image}`,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedDate || frontmatter.date,
    author: {
      "@type": "Organization",
      name: "BacalaoWorld",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "BacalaoWorld",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/artikler/${params.slug}/`,
    },
    keywords: frontmatter.tags?.join(", "),
    inLanguage: "nb-NO",
  };

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <ArticleHeader
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        imageAlt={frontmatter.imageAlt}
        date={frontmatter.date}
        readingTime={readingTime}
        category={frontmatter.category}
        backHref="/artikler/"
        backLabel="Alle artikler"
      />
      <div className="container py-12">
        <div className="prose prose-lg prose-warm mx-auto max-w-3xl">
          {content}
        </div>
      </div>
    </article>
  );
}
