"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, useVideoTexture } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const mediaItems = [
  { image: "/images/optimized/personal1.webp", video: "/videos/optimized/personal1.mp4" },
  { image: "/images/optimized/personal2.webp", video: "/videos/optimized/personal2.mp4" },
  { image: "/images/optimized/personal3.webp", video: "/videos/optimized/personal3.mp4" },
  { image: "/images/optimized/personal4.webp", video: "/videos/optimized/personal4.mp4" },
  { image: "/images/optimized/personal5.webp", video: "/videos/optimized/personal5.mp4" },
];

const roundedVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const roundedTextureFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform float uRadius;
  varying vec2 vUv;

  float roundedBox(vec2 uv, float radius) {
    vec2 centered = abs(uv - 0.5) - vec2(0.5 - radius);
    return length(max(centered, 0.0)) + min(max(centered.x, centered.y), 0.0) - radius;
  }

  void main() {
    float edge = roundedBox(vUv, uRadius);
    float alpha = 1.0 - smoothstep(0.0, 0.012, edge);
    vec4 tex = texture2D(uTexture, vUv);

    gl_FragColor = vec4(tex.rgb, tex.a * alpha * uOpacity);
  }
`;

const roundedColorFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uRadius;
  varying vec2 vUv;

  float roundedBox(vec2 uv, float radius) {
    vec2 centered = abs(uv - 0.5) - vec2(0.5 - radius);
    return length(max(centered, 0.0)) + min(max(centered.x, centered.y), 0.0) - radius;
  }

  void main() {
    float edge = roundedBox(vUv, uRadius);
    float alpha = 1.0 - smoothstep(0.0, 0.012, edge);

    gl_FragColor = vec4(uColor, alpha * uOpacity);
  }
`;

function RoundedTextureMaterial({
  texture,
  opacity = 1,
  radius = 0.08,
}) {
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      uniforms={{
        uTexture: { value: texture },
        uOpacity: { value: opacity },
        uRadius: { value: radius },
      }}
      vertexShader={roundedVertexShader}
      fragmentShader={roundedTextureFragmentShader}
    />
  );
}

function RoundedColorMaterial({
  color,
  opacity,
  radius = 0.08,
}) {
  return (
    <shaderMaterial
      transparent
      depthWrite={false}
      uniforms={{
        uColor: { value: color },
        uOpacity: { value: opacity },
        uRadius: { value: radius },
      }}
      vertexShader={roundedVertexShader}
      fragmentShader={roundedColorFragmentShader}
    />
  );
}

const showcaseVideos = [
  {
    image: "/images/optimized/personal1.webp",
    video: "/videos/optimized/personal1.mp4",
    position: [-9.5, 3.9, 1.5],
    scale: [8.5, 4.8, 1],
    rotation: [0, 0, -0.09],
  },
  {
    image: "/images/optimized/personal2.webp",
    video: "/videos/optimized/personal2.mp4",
    position: [8.8, -2.4, -3.5],
    scale: [7.8, 4.45, 1],
    rotation: [0, 0, 0.085],
  },
  {
    image: "/images/optimized/personal3.webp",
    video: "/videos/optimized/personal3.mp4",
    position: [0, 7.2, -9],
    scale: [8.8, 5, 1],
    rotation: [0, 0, 0.02],
  },
  {
    image: "/images/optimized/personal4.webp",
    video: "/videos/optimized/personal4.mp4",
    position: [-16, -7.2, -15],
    scale: [8.2, 4.7, 1],
    rotation: [0, 0, 0.11],
  },
  {
    image: "/images/optimized/personal5.webp",
    video: "/videos/optimized/personal5.mp4",
    position: [16, 6.4, -19],
    scale: [8, 4.55, 1],
    rotation: [0, 0, -0.1],
  },
];

function seededValue(seed) {
  const value =
    Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

const backgroundParticles = Array.from({ length: 18 }).map((_, index) => {
  const item =
    mediaItems[
      Math.floor(
        seededValue(index + 1) *
          mediaItems.length
      )
    ];

  return {
    image: item.image,
    video: item.video,
    position: [
      (seededValue(index + 41) - 0.5) * 74,
      (seededValue(index + 81) - 0.5) * 42,
      (seededValue(index + 121) - 0.5) * 76,
    ],
    rotation: [
      0,
      0,
      (seededValue(index + 161) - 0.5) *
        0.18,
    ],
    scale:
      seededValue(index + 201) * 0.85 +
      0.85,
  };
});

function Particle({ image, video, position, scale, rotation, onOpen }) {
  const mesh = useRef(null);
  const tex = useTexture(image);

  useEffect(() => {
    if (!mesh.current) return;

    const animation = gsap.to(mesh.current.rotation, {
      z: rotation[2] + (Math.random() - 0.5) * 0.16,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => animation.kill();
  }, [rotation]);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.lookAt(state.camera.position);

    mesh.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.26 + position[0]) * 0.22;

    mesh.current.position.x =
      position[0] +
      Math.cos(state.clock.elapsedTime * 0.18 + position[1]) * 0.14;
  });

  return (
    <group
      ref={mesh}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(video);
      }}
    >
      <mesh
        position={[0, 0, -0.13]}
        scale={[scale * 1.34, scale * 1.62, 1]}
      >
        <planeGeometry args={[1, 1.35]} />
        <RoundedColorMaterial
          color={[0.02, 0.02, 0.02]}
          opacity={0.34}
          radius={0.1}
        />
      </mesh>

      <mesh
        position={[0.22, -0.22, -0.09]}
        rotation={[0, 0, -0.09]}
        scale={[scale * 0.95, scale * 1.22, 1]}
      >
        <planeGeometry args={[1, 1.35]} />
        <RoundedTextureMaterial
          texture={tex}
          opacity={0.1}
          radius={0.09}
        />
      </mesh>

      <mesh
        position={[0.14, -0.14, -0.06]}
        rotation={[0, 0, 0.055]}
        scale={[scale * 0.98, scale * 1.25, 1]}
      >
        <planeGeometry args={[1, 1.35]} />
        <RoundedTextureMaterial
          texture={tex}
          opacity={0.18}
          radius={0.09}
        />
      </mesh>

      <mesh
        position={[0.07, -0.07, -0.03]}
        rotation={[0, 0, -0.025]}
        scale={[scale, scale * 1.27, 1]}
      >
        <planeGeometry args={[1, 1.35]} />
        <RoundedTextureMaterial
          texture={tex}
          opacity={0.3}
          radius={0.09}
        />
      </mesh>

      <mesh scale={[scale, scale * 1.3, 1]}>
        <planeGeometry args={[1, 1.35]} />
        <RoundedTextureMaterial
          texture={tex}
          opacity={0.7}
          radius={0.09}
        />
      </mesh>
    </group>
  );
}

function ShowcaseVideo({ video, position, scale, rotation, onOpen }) {
  const mesh = useRef(null);
  const texture = useVideoTexture(video, {
    muted: true,
    loop: true,
    start: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });

  useEffect(() => {
    if (!mesh.current) return;

    const animation = gsap.to(mesh.current.rotation, {
      z: rotation[2] * 1.25,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => animation.kill();
  }, [rotation]);

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.lookAt(state.camera.position);

    mesh.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.36;

    mesh.current.position.x =
      position[0] +
      Math.cos(state.clock.elapsedTime * 0.2 + position[2]) * 0.22;
  });

  return (
    <group
      ref={mesh}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(video);
      }}
    >
      <mesh
        scale={[scale[0] * 1.23, scale[1] * 1.28, 1]}
        position={[0, 0, -0.12]}
      >
        <planeGeometry args={[1, 1]} />
        <RoundedColorMaterial
          color={[0.01, 0.01, 0.01]}
          opacity={0.42}
          radius={0.09}
        />
      </mesh>

      <mesh
        scale={[scale[0] * 1.04, scale[1] * 1.04, 1]}
        position={[0.42, -0.36, -0.09]}
        rotation={[0, 0, -0.045]}
      >
        <planeGeometry args={[1, 1]} />
        <RoundedColorMaterial
          color={[0.035, 0.035, 0.035]}
          opacity={0.82}
          radius={0.1}
        />
      </mesh>

      <mesh
        scale={[scale[0] * 1.025, scale[1] * 1.025, 1]}
        position={[0.22, -0.18, -0.055]}
        rotation={[0, 0, 0.025]}
      >
        <planeGeometry args={[1, 1]} />
        <RoundedColorMaterial
          color={[0.11, 0.11, 0.11]}
          opacity={0.72}
          radius={0.1}
        />
      </mesh>

      <mesh
        scale={[scale[0] * 1.012, scale[1] * 1.012, 1]}
        position={[0, 0, -0.026]}
      >
        <planeGeometry args={[1, 1]} />
        <RoundedColorMaterial
          color={[0.86, 0.86, 0.86]}
          opacity={0.16}
          radius={0.105}
        />
      </mesh>

      <mesh scale={[scale[0] * 0.985, scale[1] * 0.985, 1]}>
        <planeGeometry args={[1, 1]} />
        <RoundedTextureMaterial
          texture={texture}
          radius={0.105}
        />
      </mesh>
    </group>
  );
}

function UniverseParticles({ onOpen }) {
  return backgroundParticles.map((p, i) => (
    <Particle key={i} {...p} onOpen={onOpen} />
  ));
}

function ShowcaseVideos({ onOpen }) {
  return showcaseVideos.map((item) => (
    <ShowcaseVideo
      key={item.video}
      {...item}
      onOpen={onOpen}
    />
  ));
}

function FullscreenVideo({ activeVideo, onClose }) {
  useEffect(() => {
    if (!activeVideo) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [activeVideo, onClose]);

  if (!activeVideo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen video"
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/90
        backdrop-blur-2xl
      "
      onClick={onClose}
    >
      <video
        src={activeVideo}
        autoPlay
        controls
        playsInline
        className="
          max-h-[90vh]
          max-w-[88vw]
          rounded-[32px]
          object-contain
          shadow-[0_40px_120px_rgba(0,0,0,0.75)]
        "
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        className="
          absolute
          right-6
          top-6
          rounded-full
          border
          border-white/15
          bg-white/10
          px-4
          py-2
          text-sm
          text-white
          backdrop-blur-xl
          transition
          hover:bg-white/20
        "
      >
        Close
      </button>
    </div>
  );
}

export default function UniverseScene() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <div className="fixed inset-0 z-0 bg-black">
        <Canvas
          dpr={[1, 1.25]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
          }}
          camera={{
            position: [0, 0, 18],
            fov: 50,
            near: 0.1,
            far: 500,
          }}
        >
          <color attach="background" args={["#000000"]} />

          <fog attach="fog" args={["#000000", 80, 260]} />

          <ambientLight intensity={0.9} />

          <UniverseParticles onOpen={setActiveVideo} />
          <ShowcaseVideos onOpen={setActiveVideo} />

          <OrbitControls
            enableZoom={!activeVideo}
            enablePan={!activeVideo}
            enableRotate={!activeVideo}
            enableDamping={true}
            dampingFactor={0.06}
            zoomSpeed={0.75}
            panSpeed={0.75}
            rotateSpeed={0.55}
            minDistance={8}
            maxDistance={55}
          />
        </Canvas>
      </div>

      <FullscreenVideo
        activeVideo={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
