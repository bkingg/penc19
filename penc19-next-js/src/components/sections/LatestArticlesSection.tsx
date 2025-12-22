import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { LatestArticlesSectionType } from "@/types";

interface LatestArticlesSectionProps {
  section: LatestArticlesSectionType;
}

const ACTUALITES_QUERY = groq`*[
  _type == "article"
  && defined(slug.current)
][0..3] | order(_createdAt desc)
{_id, title, slug, tags[], image, description, _createdAt}`;

export default async function LatestArticlesSection({
  section,
}: LatestArticlesSectionProps) {
  const actualites = await sanityFetch<SanityDocument[]>({
    query: ACTUALITES_QUERY,
  });
  return (
    <section className="section section__actualites">
      <div className="container">
        {section.title !== undefined && (
          <h1 className="text-center">{section.title}</h1>
        )}
        {section.description !== undefined && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {actualites.map((actualite) => {
            return <ArticleCard key={actualite._id} actualite={actualite} />;
          })}
        </div>
        <div className="text-center my-2">
          <Link href="/actualites" className="btn btn-primary">
            Voir Plus...
          </Link>
        </div>
      </div>
    </section>
  );
}
