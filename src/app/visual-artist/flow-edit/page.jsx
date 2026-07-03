import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Rhythm Cut",
    type: "Flow Edit",
    video: "/videos/optimized/personal2.mp4",
    poster: "/images/optimized/personal2.webp",
  },
  {
    title: "Motion Pulse",
    type: "Transition Study",
    video: "/videos/optimized/personal3.mp4",
    poster: "/images/optimized/personal3.webp",
  },
  {
    title: "Energy Sequence",
    type: "Speed Edit",
    video: "/videos/optimized/project1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
];

export default function FlowEditPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Artist"
      title="FLOW EDIT"
      description="Fast-paced edits built on timing, movement, transitions, rhythm, and the feeling of continuous visual energy."
      items={items}
    />
  );
}
