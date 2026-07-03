import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Luxury Visual Identity",
    type: "Brand Mood",
    video: "/videos/optimized/personal4.mp4",
    poster: "/images/optimized/personal4.webp",
  },
  {
    title: "Cinematic Composition",
    type: "Look Direction",
    video: "/videos/optimized/project1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
  {
    title: "Atmosphere Study",
    type: "Creative System",
    video: "/videos/optimized/personal5.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function ArtDirectionPage() {
  return (
    <ShowcasePage
      eyebrow="Creative Direction"
      title="ART DIRECTION"
      description="Luxury-focused visual systems, moodboards, concepts, compositions, and cinematic art direction shaped for memorable brand storytelling."
      items={items}
    />
  );
}
