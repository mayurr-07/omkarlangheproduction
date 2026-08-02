"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export interface LensProgress {
  current: { p: number };
}

/* ——— Knurled grip ribs around the focus ring ——— */
function GripRidges({ count = 64, radius = 1.43, z = 0.42 }) {
  const ref = useRef<THREE.InstancedMesh>(null!);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * radius, Math.sin(a) * radius, z);
      dummy.rotation.z = a;
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count, radius, z]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
    >
      <boxGeometry args={[0.065, 0.05, 0.86]} />
      <meshStandardMaterial color="#0b0b0d" metalness={0.7} roughness={0.5} />
    </instancedMesh>
  );
}

/* ——— Iris blades deep inside the front assembly ——— */
const BLADE_COUNT = 9;

function ApertureBlades({ innerRef }: { innerRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={innerRef} position={[0, 0, 1.6]}>
      {Array.from({ length: BLADE_COUNT }).map((_, i) => {
        const a = (i / BLADE_COUNT) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0]}
            rotation={[0, 0, a + 0.62]}
          >
            <boxGeometry args={[0.55, 0.17, 0.014]} />
            <meshStandardMaterial
              color="#1d1d22"
              metalness={0.9}
              roughness={0.28}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ——— Camera grip ridges ——— */
function CameraGripRidges({ count = 28, x = 1.85, yStart = -0.65, z = -1.55 }) {
  const ref = useRef<THREE.InstancedMesh>(null!);

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const y = yStart + (i / count) * 1.6;
      dummy.position.set(x, y, z);
      dummy.rotation.y = -0.12;
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count, x, yStart, z]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, count] as unknown as [THREE.BufferGeometry, THREE.Material, number]}
    >
      <boxGeometry args={[0.04, 0.05, 0.85]} />
      <meshStandardMaterial color="#050506" metalness={0.25} roughness={0.75} />
    </instancedMesh>
  );
}

/* ——— Premium Camera Body ——— */
function CameraBody() {
  // Materials
  const bodyMat = { color: "#08080a", metalness: 0.65, roughness: 0.42 };
  const rubberMat = { color: "#050506", metalness: 0.25, roughness: 0.75 };
  const metalMat = { color: "#2b2b30", metalness: 0.9, roughness: 0.28 };
  const chromeMat = { color: "#d9d9e0", metalness: 1, roughness: 0.2 };
  const redMat = { color: "#dc2626", metalness: 0.4, roughness: 0.4 };

  return (
    <group position={[0, 0, -0.2]}>
      {/* === MAIN CAMERA BODY === */}
      {/* Primary body block */}
      <mesh position={[0, 0, -1.6]}>
        <boxGeometry args={[3.6, 2.1, 0.72]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Top plate - stepped design */}
      <mesh position={[0, 1.25, -1.55]}>
        <boxGeometry args={[3.7, 0.4, 0.82]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Top plate bevel edge */}
      <mesh position={[0, 1.05, -1.55]}>
        <boxGeometry args={[3.65, 0.05, 0.78]} />
        <meshStandardMaterial color="#101014" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* === LENS MOUNT FLANGE === */}
      {/* Sturdy mount ring between body and lens */}
      <mesh position={[0, 0, -1.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 96]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Mount bayonet ring - silver accent */}
      <mesh position={[0, 0, -1.15]}>
        <torusGeometry args={[1.08, 0.025, 16, 128]} />
        <meshStandardMaterial {...chromeMat} />
      </mesh>

      {/* Inner mount throat */}
      <mesh position={[0, 0, -1.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82, 0.9, 0.12, 72, 1, true]} />
        <meshStandardMaterial color="#15151a" metalness={0.6} roughness={0.5} side={THREE.BackSide} />
      </mesh>

      {/* === RIGHT HAND GRIP === */}
      {/* Grip base - main protrusion */}
      <mesh position={[1.75, -0.08, -1.35]}>
        <boxGeometry args={[0.65, 1.85, 1.15]} />
        <meshStandardMaterial {...rubberMat} />
      </mesh>

      {/* Grip front curve approximation - angled planes */}
      <mesh position={[1.68, -0.08, -0.85]} rotation={[0, -0.25, 0]}>
        <boxGeometry args={[0.45, 1.75, 0.35]} />
        <meshStandardMaterial {...rubberMat} />
      </mesh>

      {/* Grip ridges for texture */}
      <CameraGripRidges />

      {/* Thumb rest area on grip back */}
      <mesh position={[1.85, 0.75, -1.9]}>
        <boxGeometry args={[0.4, 0.35, 0.15]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* === EVF / VIEWFINDER HUMP === */}
      {/* Main hump */}
      <mesh position={[-0.3, 1.55, -1.55]}>
        <boxGeometry args={[1.4, 0.55, 0.75]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Hump front slope */}
      <mesh position={[-0.3, 1.45, -1.18]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[1.35, 0.45, 0.2]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* EVF eyepiece */}
      <mesh position={[-0.3, 1.58, -1.98]}>
        <boxGeometry args={[0.85, 0.38, 0.35]} />
        <meshStandardMaterial {...rubberMat} />
      </mesh>

      {/* Eyepiece rubber surround */}
      <mesh position={[-0.3, 1.58, -2.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.2, 32]} />
        <meshStandardMaterial color="#111114" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Eyepiece glass */}
      <mesh position={[-0.3, 1.58, -2.22]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial color="#1f2937" metalness={0.1} roughness={0.1} />
      </mesh>

      {/* === HOT SHOE === */}
      {/* Hot shoe mount on top */}
      <mesh position={[0.9, 1.48, -1.55]}>
        <boxGeometry args={[0.6, 0.08, 0.55]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Hot shoe rails */}
      <mesh position={[0.9, 1.52, -1.55]}>
        <boxGeometry args={[0.5, 0.04, 0.08]} />
        <meshStandardMaterial {...chromeMat} />
      </mesh>

      {/* === TOP CONTROLS === */}
      {/* Shutter button - main circular */}
      <mesh position={[1.4, 1.52, -1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 32]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Shutter button chrome ring */}
      <mesh position={[1.4, 1.58, -1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.018, 12, 32]} />
        <meshStandardMaterial {...chromeMat} />
      </mesh>

      {/* Mode dial - knurled */}
      <mesh position={[-1.2, 1.5, -1.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.25, 32]} />
        <meshStandardMaterial color="#121216" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Mode dial knurl texture ring */}
      <mesh position={[-1.2, 1.63, -1.55]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.025, 12, 48]} />
        <meshStandardMaterial color="#1f1f24" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Command dial front */}
      <mesh position={[0.4, 1.48, -1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
        <meshStandardMaterial color="#16161a" metalness={0.6} roughness={0.45} />
      </mesh>

      {/* Command dial ring */}
      <mesh position={[0.4, 1.52, -1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.14, 0.015, 8, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Rear command dial */}
      <mesh position={[1.4, 1.48, -1.95]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Record button - small red */}
      <mesh position={[1.65, 1.5, -1.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.06, 20]} />
        <meshStandardMaterial {...redMat} />
      </mesh>

      {/* === REAR LCD SCREEN === */}
      {/* LCD outer frame */}
      <mesh position={[-0.2, 0.15, -1.98]}>
        <boxGeometry args={[2.4, 1.55, 0.06]} />
        <meshStandardMaterial color="#0d0d10" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* LCD glass surface */}
      <mesh position={[-0.2, 0.15, -1.95]}>
        <boxGeometry args={[2.2, 1.35, 0.02]} />
        <meshStandardMaterial color="#0f1520" metalness={0.15} roughness={0.08} />
      </mesh>

      {/* LCD subtle glow line */}
      <mesh position={[-0.2, 0.85, -1.94]}>
        <boxGeometry args={[2.0, 0.02, 0.01]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>

      {/* === STRAP LUGS === */}
      {/* Left strap lug */}
      <mesh position={[-1.85, 0.6, -1.6]}>
        <torusGeometry args={[0.08, 0.04, 12, 32]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Right strap lug */}
      <mesh position={[1.85, 0.6, -1.6]}>
        <torusGeometry args={[0.08, 0.04, 12, 32]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* === SIDE PANELS & DETAILS === */}
      {/* Left side grip texture */}
      <mesh position={[-1.82, -0.2, -1.55]}>
        <boxGeometry args={[0.12, 1.2, 0.65]} />
        <meshStandardMaterial {...rubberMat} />
      </mesh>

      {/* Front body lip under lens */}
      <mesh position={[0, -0.9, -1.15]}>
        <boxGeometry args={[2.0, 0.25, 0.35]} />
        <meshStandardMaterial {...bodyMat} />
      </mesh>

      {/* Brand text plate - subtle raised area */}
      <mesh position={[-0.9, 1.52, -1.15]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#141418" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* === BODY SEAMS & PANEL LINES === */}
      {/* Horizontal seam line */}
      <mesh position={[0, 0.35, -1.56]}>
        <boxGeometry args={[3.5, 0.015, 0.74]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Vertical seam on grip side */}
      <mesh position={[1.45, -0.08, -1.56]}>
        <boxGeometry args={[0.015, 1.9, 0.74]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * A cinema lens built procedurally — barrel, focus ring, iris
 * blades and real glass. Scroll progress (0→1) drives the
 * mechanical zoom: the barrel extends, the iris rotates and
 * the sensor glows amber as it finds focus.
 */
export default function LensModel({ progress }: { progress: LensProgress }) {
  const root = useRef<THREE.Group>(null!);
  const front = useRef<THREE.Group>(null!);
  const blades = useRef<THREE.Group>(null!);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null!);
  const ringMat = useRef<THREE.MeshStandardMaterial>(null!);
  const smoothed = useRef(0);

  useFrame((state, delta) => {
    smoothed.current = THREE.MathUtils.damp(smoothed.current, progress.current.p, 4.5, delta);
    const s = smoothed.current;
    const t = state.clock.elapsedTime;

    // Phase 1 — the lens extends & zooms toward the viewer
    const p1 = THREE.MathUtils.smoothstep(s, 0.02, 0.45);
    // Phase 2 — it drifts aside, handing the stage to the words
    const p2 = THREE.MathUtils.smoothstep(s, 0.42, 0.98);
    const mobile = state.size.width < 768;

    const g = root.current;
    g.position.z = THREE.MathUtils.lerp(-0.35, 2.25, p1) - p2 * 1.15;
    g.position.x = THREE.MathUtils.lerp(0, mobile ? 0 : -2.8, p2);
    g.position.y = Math.sin(t * 0.55) * 0.045 + (mobile ? p2 * 0.72 : 0);

    // Slightly reduced scale to fit camera body in frame
    const scale = mobile
      ? THREE.MathUtils.lerp(0.82, 0.48, p2)
      : THREE.MathUtils.lerp(0.82, 0.74, p2);
    g.scale.setScalar(scale);

    const px = mobile ? 0 : state.pointer.x;
    const py = mobile ? 0 : state.pointer.y;
    g.rotation.y = -0.34 + p1 * 0.9 - p2 * 1.1 + Math.sin(t * 0.18) * 0.05 + px * 0.13;
    g.rotation.x = Math.sin(t * 0.22) * 0.03 - py * 0.09;

    // Mechanical zoom: barrel extends, iris rotates
    front.current.position.z = p1 * 0.85;
    blades.current.rotation.z = p1 * 0.9 + t * 0.02;

    // Sensor glow & signature amber ring intensify as focus locks
    const f = 0.4 + p1 * 2.4 + Math.sin(t * 2.2) * 0.15;
    glowMat.current.color.setRGB(0.98 * f, 0.63 * f, 0.08 * f);
    ringMat.current.emissiveIntensity = 0.8 + p1 * 2.2 + Math.sin(t * 2.2) * 0.18;
  });

  return (
    <group ref={root} position={[0, 0, -0.2]}>
      {/* ——— Camera Body (attached behind lens) ——— */}
      <CameraBody />

      {/* ——— Lens Body ——— */}
      <mesh position={[0, 0, -1.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.07, 0.28, 72]} />
        <meshStandardMaterial color="#2b2b31" metalness={0.95} roughness={0.26} />
      </mesh>
      {/* mount contact ring */}
      <mesh position={[0, 0, -1.2]}>
        <torusGeometry args={[1.0, 0.022, 16, 96]} />
        <meshStandardMaterial
          color="#d9a441"
          metalness={1}
          roughness={0.3}
          emissive="#8a5a10"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.26, 1.26, 1.5, 72]} />
        <meshStandardMaterial color="#151519" metalness={0.88} roughness={0.4} />
      </mesh>
      {/* body seam */}
      <mesh position={[0, 0, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.275, 1.275, 0.05, 72]} />
        <meshStandardMaterial color="#08080a" metalness={0.8} roughness={0.5} />
      </mesh>

      {/* ——— Focus ring with knurled grip ——— */}
      <mesh position={[0, 0, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.86, 96]} />
        <meshStandardMaterial color="#101013" metalness={0.72} roughness={0.52} />
      </mesh>
      <GripRidges />
      {/* focus index mark */}
      <mesh position={[0, 1.48, 0.42]}>
        <boxGeometry args={[0.035, 0.1, 0.22]} />
        <meshStandardMaterial color="#f5f5f5" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>

      {/* ——— Extending front assembly ——— */}
      <group ref={front}>
        <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.44, 1.29, 1.05, 72]} />
          <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.32} />
        </mesh>
        {/* engraved name ring */}
        <mesh position={[0, 0, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.45, 1.45, 0.34, 96]} />
          <meshStandardMaterial color="#141418" metalness={0.92} roughness={0.3} />
        </mesh>
        {/* signature amber ring */}
        <mesh position={[0, 0, 1.9]}>
          <torusGeometry args={[1.4, 0.028, 16, 128]} />
          <meshStandardMaterial
            ref={ringMat}
            color="#f59e0b"
            metalness={1}
            roughness={0.25}
            emissive="#f59e0b"
            emissiveIntensity={1}
          />
        </mesh>
        {/* front lip */}
        <mesh position={[0, 0, 1.94]}>
          <torusGeometry args={[1.47, 0.045, 16, 96]} />
          <meshStandardMaterial color="#0a0a0d" metalness={0.85} roughness={0.35} />
        </mesh>
        {/* inner collar */}
        <mesh position={[0, 0, 1.76]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.24, 1.24, 0.34, 72, 1, true]} />
          <meshStandardMaterial color="#050506" metalness={0.6} roughness={0.62} side={THREE.BackSide} />
        </mesh>

        {/* iris + glass stack */}
        <ApertureBlades innerRef={blades} />

        {/* sensor glow — the warm heart of the lens */}
        <mesh position={[0, 0, 1.48]}>
          <circleGeometry args={[0.88, 64]} />
          <meshBasicMaterial ref={glowMat} color="#f59e0b" toneMapped={false} />
        </mesh>

        {/* inner element */}
        <mesh position={[0, 0, 1.62]} scale={[1, 1, 0.4]}>
          <sphereGeometry args={[0.96, 48, 48]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.9}
            roughness={0.14}
            ior={1.48}
            color="#5b7484"
            clearcoat={0.6}
          />
        </mesh>
        {/* front glass */}
        <mesh position={[0, 0, 1.8]} scale={[1, 1, 0.32]}>
          <sphereGeometry args={[1.22, 64, 64]} />
          <meshPhysicalMaterial
            transmission={1}
            thickness={1.3}
            roughness={0.05}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0.06}
            color="#c9dce8"
            attenuationColor="#f59e0b"
            attenuationDistance={3.5}
          />
        </mesh>
      </group>
    </group>
  );
}
