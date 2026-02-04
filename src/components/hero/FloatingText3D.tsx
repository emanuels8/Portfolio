import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

type FloatingText3DProps = {
  position: [number, number, number];
  color: string;
  text: string;
  size?: number;
  speed?: number;
  avoidOverlap?: boolean;
  overlapPadding?: number;
  overlapStrength?: number;
  avoidCenter?: boolean;
  centerWorld?: [number, number, number];
  centerRadius?: number;
  keepInView?: boolean;
  viewMargin?: number;
  centerNdcRadiusX?: number;
  centerNdcRadiusY?: number;
  outlineColor?: string;
  outlineScale?: number;
  showBackplate?: boolean;
};

type RegistryItem = {
  pos: THREE.Vector3;
  radius: number;
};

const labelRegistry = new Map<string, RegistryItem>();

const FloatingText3D: React.FC<FloatingText3DProps> = ({
  position,
  color,
  text,
  size = 0.25,
  speed = 0.5,

  avoidOverlap = true,
  overlapPadding = 2.2,
  overlapStrength = 2.4,

  avoidCenter = true,
  centerWorld = [0, 0, 0],
  centerRadius = 4.8,

  keepInView = true,
  viewMargin = 0.88,

  centerNdcRadiusX = 0.75,
  centerNdcRadiusY = 0.5,
}) => {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);

  const { invalidate, camera, size: viewportSize } = useThree();
  const idRef = useRef<string>(`label_${Math.random().toString(36).slice(2)}`);

  const base = useMemo(() => new THREE.Vector3(...position), [position]);
  const center = useMemo(
    () => new THREE.Vector3(...centerWorld),
    [centerWorld],
  );

  const offset = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());

  const tmpV = useMemo(() => new THREE.Vector3(), []);
  const tmpDelta = useMemo(() => new THREE.Vector3(), []);
  const desiredAvoid = useMemo(() => new THREE.Vector3(), []);
  const boundsAvoid = useMemo(() => new THREE.Vector3(), []);

  const camRight = useMemo(() => new THREE.Vector3(), []);
  const camUp = useMemo(() => new THREE.Vector3(), []);

  const baseMotion = useMemo(() => new THREE.Vector3(), []);

  const ndc = useMemo(() => new THREE.Vector3(), []);
  const camSpace = useMemo(() => new THREE.Vector3(), []);
  const centerAvoid = useMemo(() => new THREE.Vector3(), []);

  const fillColor = useMemo(() => {
    const c = new THREE.Color(color);
    const hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    c.setHSL(hsl.h, hsl.s, THREE.MathUtils.clamp(hsl.l * 0.6, 0, 1));
    return c;
  }, [color]);

  const radius = useMemo(() => {
    const len = Math.max(1, text.trim().length);
    return Math.max(2 * size, 0.4 + len * size * 0.45);
  }, [text, size]);

  useEffect(() => {
    labelRegistry.set(idRef.current, { pos: base.clone(), radius });
    return () => {
      labelRegistry.delete(idRef.current);
    };
  }, [base, radius]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();
    const dt = Math.min(0.035, state.clock.getDelta());

    camRight.set(1, 0, 0).applyQuaternion(camera.quaternion);
    camUp.set(0, 1, 0).applyQuaternion(camera.quaternion);

    const floatY = Math.sin(t * speed + base.x * 0.9) * 0.14;
    const sway =
      Math.sin(t * (speed * 0.9) + base.z * 1.3) * (0.03 + size * 0.03);

    baseMotion
      .copy(base)
      .setY(base.y + floatY)
      .addScaledVector(camRight, sway);

    tmpV.copy(baseMotion).add(offset.current);

    desiredAvoid.set(0, 0, 0);

    if (avoidOverlap) {
      const spreadFactor = 3.2;

      for (const [key, other] of labelRegistry) {
        if (key === idRef.current) continue;

        tmpDelta.copy(tmpV).sub(other.pos);

        let dx = tmpDelta.dot(camRight);
        let dy = tmpDelta.dot(camUp);

        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(Math.max(1e-8, distSq));

        if (distSq < 1e-6) {
          dx = 1;
          dy = 0;
        }

        const minDist = radius + other.radius + overlapPadding;
        const softDist = minDist * spreadFactor;

        if (dist < softDist) {
          const penetration = Math.max(0, minDist - dist);
          const closeness = THREE.MathUtils.clamp(
            (softDist - dist) / softDist,
            0,
            1,
          );
          const push =
            (penetration * 4.2 + closeness * closeness * (minDist * 2.2)) *
            overlapStrength;

          desiredAvoid.addScaledVector(camRight, (dx / dist) * push);
          desiredAvoid.addScaledVector(camUp, (dy / dist) * push);
        }
      }
    }

    if (avoidCenter && (camera as any).isPerspectiveCamera) {
      ndc.copy(tmpV).project(camera);

      const ax = Math.abs(ndc.x);
      const ay = Math.abs(ndc.y);

      if (ax < centerNdcRadiusX && ay < centerNdcRadiusY) {
        const sx = ndc.x === 0 ? Math.sign(base.x || 1) : Math.sign(ndc.x);
        const sy = ndc.y === 0 ? Math.sign(base.y || 1) : Math.sign(ndc.y);

        const pushOutX = centerNdcRadiusX - ax;
        const pushOutY = centerNdcRadiusY - ay;

        const pushX = pushOutX <= pushOutY;
        const dNdcX = pushX ? sx * (pushOutX + 0.03) : 0;
        const dNdcY = pushX ? 0 : sy * (pushOutY + 0.03);

        camSpace.copy(tmpV).applyMatrix4(camera.matrixWorldInverse);
        const depth = Math.max(0.001, -camSpace.z);
        const fov = THREE.MathUtils.degToRad(
          (camera as THREE.PerspectiveCamera).fov,
        );
        const halfH = depth * Math.tan(fov / 2);
        const halfW = halfH * (viewportSize.width / viewportSize.height);

        centerAvoid
          .set(0, 0, 0)
          .addScaledVector(camRight, dNdcX * halfW)
          .addScaledVector(camUp, dNdcY * halfH);

        desiredAvoid.addScaledVector(
          centerAvoid,
          Math.max(3.2, overlapStrength * 3.2),
        );
      } else {
        tmpDelta.copy(tmpV).sub(center);
        const dx = tmpDelta.dot(camRight);
        const dy = tmpDelta.dot(camUp);
        const distSq = dx * dx + dy * dy;

        if (distSq > 1e-8) {
          const dist = Math.sqrt(distSq);
          if (dist < centerRadius) {
            const push = (centerRadius - dist) * (overlapStrength * 2.2);
            desiredAvoid.addScaledVector(camRight, (dx / dist) * push);
            desiredAvoid.addScaledVector(camUp, (dy / dist) * push);
          }
        }
      }
    }

    if (keepInView && (camera as any).isPerspectiveCamera) {
      ndc.copy(tmpV).project(camera);
      boundsAvoid.set(0, 0, 0);

      const overX = Math.abs(ndc.x) - viewMargin;
      const overY = Math.abs(ndc.y) - viewMargin;

      if (overX > 0 || overY > 0) {
        camSpace.copy(tmpV).applyMatrix4(camera.matrixWorldInverse);
        const depth = Math.max(0.001, -camSpace.z);
        const fov = THREE.MathUtils.degToRad(
          (camera as THREE.PerspectiveCamera).fov,
        );
        const halfH = depth * Math.tan(fov / 2);
        const halfW = halfH * (viewportSize.width / viewportSize.height);

        if (ndc.x > viewMargin)
          boundsAvoid.addScaledVector(camRight, -(ndc.x - viewMargin) * halfW);
        if (ndc.x < -viewMargin)
          boundsAvoid.addScaledVector(
            camRight,
            -((ndc.x + viewMargin) * halfW),
          );

        if (ndc.y > viewMargin)
          boundsAvoid.addScaledVector(camUp, -(ndc.y - viewMargin) * halfH);
        if (ndc.y < -viewMargin)
          boundsAvoid.addScaledVector(camUp, -((ndc.y + viewMargin) * halfH));

        desiredAvoid.addScaledVector(boundsAvoid, 3.2);
      }
    }

    const springK = 6.0;
    desiredAvoid.addScaledVector(offset.current, -springK);

    const damping = 0.78;
    velocity.current.addScaledVector(desiredAvoid, dt);
    velocity.current.multiplyScalar(Math.pow(damping, dt * 60));
    offset.current.addScaledVector(velocity.current, dt);

    const maxOffset = Math.max(1.2, size * 5.0, radius * 1.8);
    if (offset.current.length() > maxOffset) {
      offset.current.setLength(maxOffset);
      velocity.current.multiplyScalar(0.3);
    }

    ref.current.position.copy(baseMotion).add(offset.current);

    const item = labelRegistry.get(idRef.current);
    if (item) item.pos.copy(ref.current.position);

    ref.current.quaternion.copy(camera.quaternion);
    invalidate();
  });

  return (
    <group ref={ref} position={position}>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={size}
          height={0.06}
          curveSegments={8}
          bevelEnabled={false}
          castShadow={false}
          receiveShadow={false}
        >
          {text}
          <meshBasicMaterial ref={mat} color={fillColor} toneMapped={false} />
        </Text3D>
      </Center>
    </group>
  );
};

export default FloatingText3D;
