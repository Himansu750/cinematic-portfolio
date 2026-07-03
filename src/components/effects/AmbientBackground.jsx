"use client";

export default function AmbientBackground() {
  return (
    <div
      className="
        fixed
        inset-0
        -z-10

        overflow-hidden

        bg-[#040404]
      "
    >
      <div
        className="
          absolute
          inset-x-0
          top-0

          h-[380px]

          bg-gradient-to-b
          from-white/[0.018]
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-[360px]

          bg-gradient-to-t
          from-black/45
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_50%_38%,transparent_0%,rgba(0,0,0,0.18)_58%,rgba(0,0,0,0.72)_100%)]
        "
      />
    </div>
  );
}
