import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Brand Motion",
    type: "Commercial",
    video: "/videos/optimized/project1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
  {
    title: "Premium Atmosphere",
    type: "Campaign Look",
    video: "/videos/optimized/personal4.mp4",
    poster: "/images/optimized/personal4.webp",
  },
  {
    title: "Visual Identity",
    type: "Brand Film",
    video: "/videos/optimized/visual-artist-hero.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function CommercialPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Artist"
      title="COMMERCIAL"
      description="Brand-focused visuals with cinematic pacing, premium lighting, smooth movement, and strong visual identity."
      items={items}
    />
  );
}
