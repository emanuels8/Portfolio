import React from "react";
import { Environment } from "@react-three/drei";

const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.6} color="#faf8f5" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.8}
        color="#fff8f0"
        castShadow
      />
      <directionalLight
        position={[-6, -4, -3]}
        intensity={0.5}
        color="#e0f2fe"
      />
      <pointLight position={[0, 0, 8]} intensity={0.8} color="#5eead4" />
      <spotLight
        position={[0, 14, 2]}
        angle={0.4}
        penumbra={1}
        intensity={0.9}
        color="#f0fdfa"
      />
      <Environment preset="city" />
    </>
  );
};

export default SceneLighting;
