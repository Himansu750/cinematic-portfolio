import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Night Vision",
    type: "Personal Project",
    video: "/videos/optimized/personal1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
  {
    title: "Mirror Motion",
    type: "Visual Study",
    video: "/videos/optimized/personal2.mp4",
    poster: "/images/optimized/personal2.webp",
  },
  {
    title: "Frame Language",
    type: "Art Direction",
    video: "/videos/optimized/personal3.mp4",
    poster: "/images/optimized/personal3.webp",
  },
  {
    title: "Urban Texture",
    type: "Cinematic Mood",
    video: "/videos/optimized/personal4.mp4",
    poster: "/images/optimized/personal4.webp",
  },
  {
    title: "Atmosphere Test",
    type: "Experimental",
    video: "/videos/optimized/personal5.mp4",
    poster: "/images/optimized/personal5.webp",
  },
];

export default function PersonalProjectsPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Artist"
      title="PERSONAL PROJECTS"
      description="Self-directed visual experiments exploring atmosphere, street energy, framing, motion, and cinematic identity."
      items={items}
    />
  );
}
