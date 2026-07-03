import ShowcasePage from "@/components/pages/ShowcasePage";

const items = [
  {
    title: "Coming Soon",
    type: "New Stack",
    video: "/videos/optimized/personal1.mp4",
    poster: "/images/optimized/personal1.webp",
  },
];

export default function NewStackPage() {
  return (
    <ShowcasePage
      eyebrow="Visual Artist"
      title="NEW STACK"
      description="A placeholder visual stack ready to be renamed and shaped into its final category."
      items={items}
    />
  );
}
