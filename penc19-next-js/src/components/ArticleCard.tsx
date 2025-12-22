import { SanityDocument } from "next-sanity";
import Link from "next/link";
import urlFor from "@/lib/urlFor";
import Image from "next/image";
import { formatDistance, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import Tags from "./Tags";

interface ArticleCardProps {
  actualite: SanityDocument;
}

export default async function ArticleCard({ actualite }: ArticleCardProps) {
  const articleImageUrl = actualite.image
    ? urlFor(actualite.image).size(500, 500).fit("crop").url()
    : "";
  return (
    <>
      <Link
        href={`/actualites/${actualite.slug.current}`}
        className="article col mb-5"
      >
        <div className="card h-100">
          <Tags tags={actualite.tags} />
          <Image
            src={articleImageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={actualite.title}
            title={actualite.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{actualite.title}</h5>
            {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
          </div>
          <div className="card-footer">
            Publié il y a&nbsp;
            <time dateTime={actualite._createdAt}>
              {formatDistance(Date.now(), parseISO(actualite._createdAt), {
                locale: fr,
              })}
            </time>
          </div>
        </div>
      </Link>
    </>
  );
}
