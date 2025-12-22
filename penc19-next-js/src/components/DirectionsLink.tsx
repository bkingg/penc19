"use client";

export default function DirectionsLink({
  embedUrl,
  className,
}: {
  embedUrl: string;
  className: string;
}) {
  const getDirectionsLink = () => {
    const match = embedUrl.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
    if (!match) return "#"; // Return empty link if no coordinates found

    const lng = match[1]; // Longitude is first
    const lat = match[2]; // Latitude is second

    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };
  return (
    <a
      href={getDirectionsLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Itinéraire
    </a>
  );
}
