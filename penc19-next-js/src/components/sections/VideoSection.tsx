import { VideoSectionType } from "@/types";

interface VideoSectionProps {
  section: VideoSectionType;
}

export default function VideoSection({ section }: VideoSectionProps) {
  const getYouTubeID = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };
  return (
    <section className="section section-animate section__video">
      <div className="text-center">
        {section.title && <h2>{section.title}</h2>}
        {section.description && <p>{section.description}</p>}

        {section.url && (
          <iframe
            width="100%"
            height="600"
            style={{ display: "block" }}
            src={`https://www.youtube.com/embed/${getYouTubeID(section.url)}?showinfo=0&modestbranding=1&fs=0&controls=0&rel=0&color=white&enablejsapi=1&o=0&widgetid=3`}
            title={section.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
}
