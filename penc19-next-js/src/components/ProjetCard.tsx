import { SanityDocument } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import urlFor from "@/lib/urlFor";

interface ProjetCardProps {
  projet: Projet | SanityDocument;
}

interface Projet {
  _id: string;
  title: string;
  ville: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
}

export default function ProjetCard({ projet }: ProjetCardProps) {
  projet.imageUrl = projet.image
    ? urlFor(projet.image).size(500, 500).fit("crop").url()
    : "";
  return (
    <>
      <Link
        href={`/projets/${projet.slug.current}`}
        className="projet col mb-5"
      >
        <div className="card h-100">
          <Image
            src={projet.imageUrl ? projet.imageUrl : "/placeholder.svg"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={projet.title}
            title={projet.title}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="vidaloka card-title">{projet.title}</h5>
            <p className="card-text">{projet.ville}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
