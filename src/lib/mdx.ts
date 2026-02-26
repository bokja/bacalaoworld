import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MdxComponents";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentType = "oppskrifter" | "artikler";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  image: string;
  imageAlt: string;
  category: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  // Recipe-only
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  difficulty?: "Enkel" | "Middels" | "Avansert";
  cuisine?: string;
  ingredients?: string[];
  calories?: string;
  steps?: string[];
}

export interface ContentItem extends ArticleFrontmatter {
  slug: string;
  readingTime: number;
}

export function getSlugs(type: ContentType): string[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getFrontmatter(
  type: ContentType,
  slug: string
): ContentItem {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    ...(data as ArticleFrontmatter),
    slug,
    readingTime: Math.ceil(stats.minutes),
  };
}

export function getAllContent(type: ContentType): ContentItem[] {
  const slugs = getSlugs(type);
  return slugs
    .map((slug) => getFrontmatter(type, slug))
    .filter((item) => !item.draft)
    .filter((item) => new Date(item.date) <= new Date())
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getFeaturedContent(limit = 6): ContentItem[] {
  const all = [
    ...getAllContent("oppskrifter"),
    ...getAllContent("artikler"),
  ]
    .filter((item) => item.featured)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  return all.slice(0, limit);
}

export function getRelatedContent(
  currentSlug: string,
  currentType: ContentType,
  currentTags: string[],
  limit = 3
): (ContentItem & { type: ContentType })[] {
  const tagSet = new Set(currentTags.map((t) => t.toLowerCase()));

  const allWithType = [
    ...getAllContent("artikler").map((item) => ({ ...item, type: "artikler" as ContentType })),
    ...getAllContent("oppskrifter").map((item) => ({ ...item, type: "oppskrifter" as ContentType })),
  ];

  return allWithType
    .filter((item) => !(item.slug === currentSlug && item.type === currentType))
    .map((item) => {
      const score = item.tags.filter((t) => tagSet.has(t.toLowerCase())).length;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function parseFaqs(type: ContentType, slug: string): FaqItem[] {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  const lines = content.split("\n");
  const faqs: FaqItem[] = [];
  let inFaqSection = false;
  let currentQuestion = "";
  let currentAnswer: string[] = [];

  for (const line of lines) {
    if (/^## (Vanlige spørsmål|Ofte stilte spørsmål)/.test(line)) {
      inFaqSection = true;
      continue;
    }
    if (!inFaqSection) continue;
    if (/^## /.test(line)) break; // next H2 ends FAQ section

    if (/^### /.test(line)) {
      if (currentQuestion && currentAnswer.length) {
        faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
      }
      currentQuestion = line.replace(/^### /, "").trim();
      currentAnswer = [];
    } else if (currentQuestion && line.trim()) {
      currentAnswer.push(line.trim());
    }
  }
  if (currentQuestion && currentAnswer.length) {
    faqs.push({ question: currentQuestion, answer: currentAnswer.join(" ").trim() });
  }

  return faqs;
}

export async function getCompiledMDX(type: ContentType, slug: string) {
  const filePath = path.join(CONTENT_DIR, type, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source: raw,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  const stats = readingTime(raw);

  return {
    content,
    frontmatter,
    readingTime: Math.ceil(stats.minutes),
  };
}
