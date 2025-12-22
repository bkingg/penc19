import { client } from "@/sanity/client";
import imgUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imgUrlBuilder(client);

export default function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
