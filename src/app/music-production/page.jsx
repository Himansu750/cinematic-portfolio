import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Atmospheric Sound",
    type: "Sound Design",
    video: "/videos/optimized/personal3.mp4",
    poster: "/images/optimized/personal3.webp",
  },
  {
    title: "Rhythm And Motion",
    type: "Audio Editing",
    video: "/videos/optimized/personal2.mp4",
    poster: "/images/optimized/personal2.webp",
  },
  {
    title: "Cinematic Texture",
    type: "Production",
    video: "/videos/optimized/visual-artist-hero.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function MusicProductionPage() {
  return (
    <ShowcasePage
      eyebrow="Audio Engineer"
      title="MUSIC PRODUCTION"
      description="Cinematic audio, atmospheric sound design, rhythm editing, and emotional sonic textures built to support visual storytelling."
      items={items}
    />
  );
}
