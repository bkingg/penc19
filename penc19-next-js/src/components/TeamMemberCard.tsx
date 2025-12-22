import { SanityDocument } from "next-sanity";
import urlFor from "@/lib/urlFor";
import Image from "next/image";

interface TeamMemberCardProps {
  teamMember: SanityDocument;
}

export default async function TeamMemberCard({
  teamMember,
}: TeamMemberCardProps) {
  const teamMemberImageUrl = teamMember.image
    ? urlFor(teamMember.image).size(600, 800).fit("crop").url()
    : "";
  return (
    <>
      <div className="card team-member h-100">
        <Image
          src={teamMemberImageUrl}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={teamMember.title}
          title={teamMember.title}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{teamMember.title}</h5>
          {/* <p className="card-text">
                      lorem ipsum dolor sit amet
                    </p> */}
        </div>
        {teamMember.social && <div className="card-footer"></div>}
      </div>
    </>
  );
}
