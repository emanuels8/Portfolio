import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import * as THREE from "three";
import FloatingText3D from "./FloatingText3D";
import SceneLighting from "./SceneLighting";
import type { Keyword } from "./SceneKeywords";

function useDebouncedResize(delay = 400) {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        setIsResizing(false);
      }, delay);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [delay]);

  return { ...dimensions, isResizing };
}

type ScenePanelProps = {
  keywords: Keyword[];
};

const ScenePanel: React.FC<ScenePanelProps> = ({ keywords }) => {
  const { width, isResizing } = useDebouncedResize(350);

  // Responsive FOV
  let fov = 55;
  let camZ = 14;
  if (width < 1024) {
    fov = 60;
    camZ = 16;
  }
  if (width < 768) {
    fov = 65;
    camZ = 18;
  }

  if (isResizing) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-400" />
      </div>
    );
  }

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="demand"
      camera={{ position: [0, 0, camZ], fov }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#f8f6f1", 1);
        scene.background = new THREE.Color("#f8f6f1");
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneLighting />
        {keywords.map((keyword, index) => (
          <FloatingText3D
            key={index}
            position={keyword.position}
            color={keyword.color}
            text={keyword.text}
            size={keyword.size}
            speed={keyword.speed}
            avoidCenter={false}
            centerRadius={0}
            avoidOverlap={false}
            keepInView={true}
            viewMargin={0.65}
          />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ScenePanel;
