import { useRef, useEffect, useCallback } from "react";
import type { FC } from "react";
import * as THREE from "three";

const VERTEX = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  const vec3 BG      = vec3(0.047, 0.071, 0.225);
  const vec3 TEAL    = vec3(0.078, 0.725, 0.651);
  const vec3 EMERALD = vec3(0.063, 0.725, 0.506);
  const vec3 CYAN    = vec3(0.024, 0.714, 0.831);
  const vec3 GREEN   = vec3(0.204, 0.831, 0.553);

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289((x * 34.0 + 1.0) * x); }

  
  float snoise(vec2 v) {
    const vec4 C = vec4(
       0.211324865405187,   
       0.366025403784439,   
      -0.577350269189626,  
       0.024390243902439    
    );
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289v2(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.18;

   
    vec2 mouse = (uMouse - 0.5) * vec2(aspect, 1.0);
    vec2 toMouse = mouse - p;
    float mDist = length(toMouse);
    float mInfluence = exp(-mDist * 2.5) * 0.35;
    p += toMouse * mInfluence;

    float n1 = snoise(p * 1.8 + vec2(t, t * 0.7));
    float n2 = snoise(p * 3.2 + vec2(-t * 0.6, t * 0.5) + n1 * 0.5);
    float n3 = snoise(p * 5.5 + vec2(t * 0.4, -t * 0.3) + n2 * 0.4);
    float n4 = snoise(p * 8.0 + vec2(-t * 0.35, t * 0.25) + n3 * 0.3);
    float ether = n1 * 0.5 + n2 * 0.25 + n3 * 0.125 + n4 * 0.0625;
    ether = ether * 0.5 + 0.5;
    
    vec3 col;
    if (ether < 0.33) {
      col = mix(TEAL, EMERALD, ether / 0.33);
    } else if (ether < 0.66) {
      col = mix(EMERALD, CYAN, (ether - 0.33) / 0.33);
    } else {
      col = mix(CYAN, GREEN, (ether - 0.66) / 0.34);
    }
    
    float bright = snoise(p * 2.0 + vec2(t * 0.3, -t * 0.4)) * 0.5 + 0.5;
    bright = smoothstep(0.15, 0.85, bright);

    float intensity = smoothstep(0.2, 0.75, ether) * (0.3 + bright * 0.35);
    vec3 result = mix(BG, col, intensity);
  
    float glow = exp(-mDist * 3.5) * 0.1;
    vec3 glowCol = mix(TEAL, EMERALD, sin(uTime * 0.5) * 0.5 + 0.5);
    result += glowCol * glow;

    float vig = 1.0 - length(uv - 0.5) * 0.7;
    result *= vig;

    gl_FragColor = vec4(result, 1.0);
  }
`;

const FluidBackground: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = {
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const smoothMouse = { x: 0.5, y: 0.5 };

    const clock = new THREE.Clock();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      uniforms.uTime.value = clock.getElapsedTime();

      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.04;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.04;
      uniforms.uMouse.value.set(smoothMouse.x, 1.0 - smoothMouse.y);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
