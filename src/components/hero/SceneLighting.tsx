import React from "react";
import { Environment } from "@react-three/drei";

const SceneLighting: React.FC = () => {
  return (
    <>
      <color attach="background" args={["transparent"]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.8}
        color="#38bdf8"
      />
      <pointLight position={[0, 0, 10]} intensity={1.2} color="#60a5fa" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1.5}
      />

      <Environment preset="studio" />
    </>
  );
};

export default SceneLighting;
