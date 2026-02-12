import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Sections from "@/components/sections/Sections";

export default async function Home({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const HOMEPAGE_QUERY = groq`*[
    _type == "page"
    && language == $language
    && (slug.current == "accueil" || slug.current == "home")
  ][0]{
    _id, 
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language
    },
    sections[]{
      _type,
      ...,
      "brochureUrl": brochure.asset->url,
      services[]->{
        _id, title, slug, image
      },
      projets[]->{
        _id, title, ville, slug, image
      },
      temoignages,
      _type == "reference" => @->{  
        title,
        photos[]{
          _key,
          asset->{
            _id,
            url,
            metadata {
              dimensions
            }
          },
          alt
        }
      },
      _type != "reference" => @
    },
  }`;

  const home = await sanityFetch<SanityDocument>({
    query: HOMEPAGE_QUERY,
    params: { language: language },
  });
  return home?.sections && <Sections sections={home.sections} />;
}
