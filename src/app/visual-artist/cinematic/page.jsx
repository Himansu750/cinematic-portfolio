import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Night Drive",
    type: "Cinematic Edit",
    video: "/videos/optimized/personal1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
  {
    title: "Visual Atmosphere",
    type: "Mood Study",
    video: "/videos/optimized/personal4.mp4",
    poster: "/images/optimized/personal4.webp",
  },
  {
    title: "Dream Sequence",
    type: "Film Texture",
    video: "/videos/optimized/personal5.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function CinematicPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Art"
      title="CINEMATIC"
      description="Atmospheric visuals built around depth, light, texture, framing, and immersive cinematic emotion."
      items={items}
    />
  );
}
