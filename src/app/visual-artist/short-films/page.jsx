import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Lost Memories",
    type: "Narrative",
    video: "/videos/optimized/personal2.mp4",
    poster: "/images/optimized/personal2.webp",
  },
  {
    title: "Cinematic Soul",
    type: "Short Film",
    video: "/videos/optimized/personal3.mp4",
    poster: "/images/optimized/personal3.webp",
  },
  {
    title: "Dream Sequence",
    type: "Mood Film",
    video: "/videos/optimized/personal5.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function ShortFilmsPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Artist"
      title="SHORT FILMS"
      description="Narrative-led visual pieces shaped around atmosphere, emotional rhythm, pacing, and cinematic memory."
      items={items}
    />
  );
}
