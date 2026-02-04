import React, { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import FloatingText3D from "./FloatingText3D";
import SceneLighting from "./SceneLighting";
import SceneBackground from "./SceneBackground";
import { keywords } from "./SceneKeywords";

const Scene: React.FC = () => {
  const [mount, setMount] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMount(document.body);
  }, []);

  const content = (
    <div className="pointer-events-none fixed inset-0 hidden md:block -z-10">
      <Canvas
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ position: [0, 0, 12], fov: 85 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Suspense fallback={null}>
          <SceneBackground />
          <SceneLighting />
          {keywords.map((keyword, index) => (
            <FloatingText3D
              key={index}
              position={keyword.position}
              color={keyword.color}
              text={keyword.text}
              size={keyword.size}
              speed={keyword.speed}
            />
          ))}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );

  return mount ? createPortal(content, mount) : null;
};

export default Scene;
