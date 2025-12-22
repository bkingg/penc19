import PageHeader from "@/components/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import ArticleCard from "@/components/ArticleCard";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

const ACTUALITES_QUERY = groq`*[
  _type == "article"
  && defined(slug.current)
] | order(_createdAt desc)
{_id, title, slug, tags[], image, description, _createdAt}`;

export default async function Actualites() {
  const actualites = await sanityFetch<SanityDocument[]>({
    query: ACTUALITES_QUERY,
  });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Actualités</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Actualités</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
            {actualites.length === undefined && (
              <p>Aucun Article disponible.</p>
            )}
            {actualites?.map((actualite) => {
              return <ArticleCard key={actualite._id} actualite={actualite} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
