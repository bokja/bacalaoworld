import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlugs, getCompiledMDX, getFrontmatter, getRelatedContent, parseFaqs } from "@/lib/mdx";
import { ArticleHeader } from "@/components/articles/ArticleHeader";
import { RelatedContent } from "@/components/articles/RelatedContent";
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
  const related = getRelatedContent(params.slug, "artikler", frontmatter.tags ?? []);
  const faqs = parseFaqs("artikler", params.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Artikler", item: `${baseUrl}/artikler/` },
      { "@type": "ListItem", position: 3, name: frontmatter.title },
    ],
  };

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

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
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
      <RelatedContent items={related} />
    </article>
  );
}
