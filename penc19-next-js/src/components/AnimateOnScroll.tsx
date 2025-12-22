"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const AnimateOnScroll: React.FC = () => {
  const pathname = usePathname(); // Get current path
  const searchParams = useSearchParams(); // Track query params

  const handleScroll = () => {
    const sections = document.querySelectorAll<HTMLElement>(".section");
    const scrollPosition = window.scrollY + window.innerHeight; // Get current scroll position

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // If the section is in the viewport (with some offset to trigger animation early)
      if (scrollPosition >= sectionTop + sectionHeight / 4) {
        section.classList.add("visible"); // Add visible class for animation
      }
    });
  };

  useEffect(() => {
    // Trigger scroll handler on page load or route change
    const handleRouteChangeComplete = () => {
      handleScroll(); // Check visibility on page load
    };

    // Initialize scroll event listener
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleRouteChangeComplete);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleRouteChangeComplete);
    };
  }, [pathname, searchParams?.toString()]); // Re-run when pathname or search params change

  return null;
};

export default AnimateOnScroll;
