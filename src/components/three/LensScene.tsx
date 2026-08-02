"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import LensModel, { type LensProgress } from "./LensModel";

export type { LensProgress };

/**
 * Studio stage for the hero lens: warm key light, amber rim,
 * procedural environment reflections (no external assets) and
 * floating golden dust. Bloom is enabled on capable screens.
 */
export default function LensScene({ progress }: { progress: LensProgress }) {
  const [bloom, setBloom] = useState(false);

  useEffect(() => {
    setBloom(
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.05, 7.4], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.22} />
      <spotLight
        position={[4.5, 5.5, 5.5]}
        angle={0.55}
        penumbra={1}
        intensity={26}
        color="#ffe7c2"
      />
      <pointLight position={[-5, -2, -3.5]} intensity={22} color="#f59e0b" />
      <pointLight position={[0, 0.5, 8]} intensity={5} color="#ffffff" />
      {/* Fill light for camera body detail */}
      <pointLight position={[3.5, 2, -2]} intensity={12} color="#fff8f0" />
      <pointLight position={[-3.5, 1, -1]} intensity={8} color="#dbe4ff" />

      <LensModel progress={progress} />

      <Sparkles
        count={90}
        scale={[11, 6.5, 5]}
        size={1.9}
        speed={0.22}
        opacity={0.35}
        color="#f3b45e"
        position={[0, 0, -1.5]}
      />

      {/* Procedural studio reflections — zero network requests */}
      <Environment resolution={256}>
        <group>
          <Lightformer
            form="rect"
            intensity={2.6}
            position={[0, 5, -8]}
            scale={[11, 5, 1]}
            color="#fff2dd"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[-6, 0.5, 1]}
            rotation-y={Math.PI / 2}
            scale={[7, 2.5, 1]}
            color="#f59e0b"
          />
          <Lightformer
            form="rect"
            intensity={1.2}
            position={[6, -0.5, 1]}
            rotation-y={-Math.PI / 2}
            scale={[7, 2, 1]}
            color="#dbe4ff"
          />
          <Lightformer form="circle" intensity={0.8} position={[0, 0, 7]} scale={2.5} />
        </group>
      </Environment>

      {bloom && (
        <EffectComposer multisampling={2}>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.72} luminanceSmoothing={0.25} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
