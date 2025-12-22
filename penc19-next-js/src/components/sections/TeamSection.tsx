import { sanityFetch } from "@/sanity/client";
import { groq, SanityDocument } from "next-sanity";
import Link from "next/link";
import { TeamSectionType } from "@/types";
import TeamMemberCard from "@/components/TeamMemberCard";

interface TeamSectionProps {
  section: TeamSectionType;
}

const TEAM_QUERY = groq`*[
  _type == "team"
  && defined(slug.current)
]
{_id, title, slug, social[], image, description}`;

export default async function TeamSection({ section }: TeamSectionProps) {
  const team = await sanityFetch<SanityDocument[]>({
    query: TEAM_QUERY,
  });
  return (
    <section className="section section-animate section__team">
      <div className="container">
        {section.title !== undefined && (
          <h1 className="text-center">{section.title}</h1>
        )}
        {section.description !== undefined && (
          <p className="text-center">{section.description}</p>
        )}
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4 pt-4 d-flex justify-content-center">
          {team.map((teamMember) => {
            return (
              <TeamMemberCard key={teamMember._id} teamMember={teamMember} />
            );
          })}
        </div>
        {section.ctaText && section.ctaUrl && (
          <div className="text-center my-2">
            <Link className="btn btn-secondary" href={section.ctaUrl}>
              {section.ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
