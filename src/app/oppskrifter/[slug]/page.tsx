import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlugs, getCompiledMDX, getFrontmatter, getRelatedContent, parseFaqs } from "@/lib/mdx";
import { ArticleHeader } from "@/components/articles/ArticleHeader";
import { RecipeMeta } from "@/components/articles/RecipeMeta";
import { RelatedContent } from "@/components/articles/RelatedContent";
import { JsonLd } from "@/components/seo/JsonLd";

const baseUrl = "https://bacalaoworld.no";

export function generateStaticParams() {
  return getSlugs("oppskrifter").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const fm = getFrontmatter("oppskrifter", params.slug);
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `/oppskrifter/${params.slug}/` },
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

export default async function RecipePage({
  params,
}: {
  params: { slug: string };
}) {
  let compiled;
  try {
    compiled = await getCompiledMDX("oppskrifter", params.slug);
  } catch {
    notFound();
  }

  const { content, frontmatter, readingTime } = compiled;
  const related = getRelatedContent(params.slug, "oppskrifter", frontmatter.tags ?? []);
  const faqs = parseFaqs("oppskrifter", params.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hjem", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Oppskrifter", item: `${baseUrl}/oppskrifter/` },
      { "@type": "ListItem", position: 3, name: frontmatter.title },
    ],
  };

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: frontmatter.title,
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
    prepTime: frontmatter.prepTime,
    cookTime: frontmatter.cookTime,
    totalTime: frontmatter.totalTime,
    recipeYield: frontmatter.servings,
    recipeCategory: frontmatter.category,
    recipeCuisine: frontmatter.cuisine || "Norsk",
    keywords: frontmatter.tags?.join(", "),
    recipeIngredient: frontmatter.ingredients || [],
    ...(frontmatter.calories && {
      nutrition: {
        "@type": "NutritionInformation",
        calories: frontmatter.calories,
      },
    }),
    ...(frontmatter.steps && {
      recipeInstructions: frontmatter.steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: step,
      })),
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/oppskrifter/${params.slug}/`,
    },
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
      <JsonLd data={recipeJsonLd} />
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
        backHref="/oppskrifter/"
        backLabel="Alle oppskrifter"
      />
      {frontmatter.prepTime && (
        <RecipeMeta
          prepTime={frontmatter.prepTime}
          cookTime={frontmatter.cookTime}
          totalTime={frontmatter.totalTime}
          servings={frontmatter.servings}
          difficulty={frontmatter.difficulty}
        />
      )}
      <div className="container py-12">
        <div className="prose prose-lg prose-warm mx-auto max-w-3xl">
          {content}
        </div>
      </div>
      <RelatedContent items={related} />
    </article>
  );
}
