"use client";

import Image from "next/image";
import Slider from "react-slick";

interface GallerySliderProps {
  gallery: ImageObject[];
}

interface ImageObject {
  _key: string;
  asset: string;
  alt: string;
}

export default function GallerySlider({ gallery }: GallerySliderProps) {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    arrows: false,
    slidesToShow: 3, // Number of items per slide
    slidesToScroll: 1, // Number of items to scroll per action
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768, // For smaller screens
        settings: {
          slidesToShow: 2, // 2 items on smaller screens
        },
      },
      {
        breakpoint: 480, // For very small screens
        settings: {
          slidesToShow: 1, // 1 item on small screens
        },
      },
    ],
  };
  console.log("gallery", gallery);
  return (
    <Slider {...settings}>
      {gallery.map((image: ImageObject) => {
        console.log("image", image);
        return (
          <div key={image._key}>
            <Image
              key={image._key}
              src={image.asset}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt={image.alt}
              title={image.alt}
              className="p-2"
            />
          </div>
        );
      })}
    </Slider>
  );
}
