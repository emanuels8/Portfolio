import React from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const SceneBackground: React.FC = () => {
  const { viewport } = useThree();

  return (
    <mesh
      position={[0, 0, -15]}
      scale={[viewport.width * 2.25, viewport.height * 2.25, 1]}
    >
      <planeGeometry />
      <meshBasicMaterial>
        <primitive
          attach="map"
          object={(() => {
            const canvas = document.createElement("canvas");
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext("2d")!;

            const gradient = ctx.createLinearGradient(0, 0, 512, 512);
            gradient.addColorStop(0, "#a5f3fc"); // cyan-100
            gradient.addColorStop(0.5, "#93c5fd"); // blue-200
            gradient.addColorStop(1, "#c7d2fe"); // indigo-200

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);

            const radial1 = ctx.createRadialGradient(
              400,
              100,
              0,
              400,
              100,
              300,
            );
            radial1.addColorStop(0, "rgba(56, 189, 248, 0.2)"); // sky-400/20
            radial1.addColorStop(1, "rgba(56, 189, 248, 0)");
            ctx.fillStyle = radial1;
            ctx.fillRect(0, 0, 512, 512);

            const radial2 = ctx.createRadialGradient(
              100,
              400,
              0,
              100,
              400,
              300,
            );
            radial2.addColorStop(0, "rgba(96, 165, 250, 0.2)"); // blue-400/20
            radial2.addColorStop(1, "rgba(96, 165, 250, 0)");
            ctx.fillStyle = radial2;
            ctx.fillRect(0, 0, 512, 512);

            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
        />
      </meshBasicMaterial>
    </mesh>
  );
};

export default SceneBackground;
