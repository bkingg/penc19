import PageHeader from "@/components/PageHeader";
import urlFor from "@/lib/urlFor";
import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";

const PAGES_QUERY = groq`*[
  _type == "page"
  && defined(slug.current)
]{_id, 
  title, 
  slug, 
  image, 
  description,
  sections[]{
    ...,
    "brochureUrl": brochure.asset->url,
    services[]->{
      _id, title, slug, image
    },
    projets[]->{
      _id, title, ville, slug, image
    },
    temoignages
  }
}`;

export default async function Pages() {
  const pages = await sanityFetch<SanityDocument[]>({ query: PAGES_QUERY });

  return (
    <>
      <PageHeader>
        <h1 className="page__title">Pages</h1>

        <Breadcrumb className="page__header__breadcrumb">
          <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
          <BreadcrumbItem active>Pages</BreadcrumbItem>
        </Breadcrumb>
      </PageHeader>
      <div className="section container">
        <div className="row">
          {pages.map((page) => {
            const pageImageUrl = page.image
              ? urlFor(page.image).size(500, 500).fit("crop").url()
              : "";
            return (
              <Link
                href={`/pages/${page.slug.current}`}
                className="article col-sm-6 col-md-3"
                key={page._id}
              >
                <div className="card h-100">
                  <Image
                    src={pageImageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    alt={page.title}
                    title={page.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{page.title}</h5>
                    {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
                    <button className="btn btn-light">
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
