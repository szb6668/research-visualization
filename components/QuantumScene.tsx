/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Cylinder, Box, Torus, Html } from '@react-three/drei';
import * as THREE from 'three';

interface VertebraProps {
  position: [number, number, number];
  rotation: [number, number, number];
  label: string;
  isHighlighted: boolean;
}

// Individual Vertebra Component
const Vertebra: React.FC<VertebraProps> = ({ 
  position, 
  rotation, 
  label, 
  isHighlighted 
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Vertebral Body */}
      <Cylinder args={[0.5, 0.5, 0.4, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          color={isHighlighted ? "#0ea5e9" : "#e2e8f0"} 
          roughness={0.5} 
          metalness={0.1} 
        />
      </Cylinder>
      
      {/* Neural Arch (Simplified) */}
      <group position={[0, 0, 0.4]}>
         <Torus args={[0.3, 0.1, 8, 16]} rotation={[0, 0, 0]}>
            <meshStandardMaterial color={isHighlighted ? "#38bdf8" : "#cbd5e1"} roughness={0.5} />
         </Torus>
         {/* Spinous Process */}
         <Box args={[0.15, 0.6, 0.15]} position={[0, -0.4, 0.1]} rotation={[-0.5, 0, 0]}>
            <meshStandardMaterial color={isHighlighted ? "#38bdf8" : "#cbd5e1"} roughness={0.5} />
         </Box>
      </group>

      {/* Label */}
      <Html position={[1.2, 0, 0]} center className={`pointer-events-none transition-opacity duration-500 ${isHighlighted ? 'opacity-100' : 'opacity-40'}`}>
        <div className={`text-xs font-bold font-sans ${isHighlighted ? 'text-blue-600' : 'text-slate-400'}`}>
          {label}
        </div>
      </Html>
    </group>
  );
};

interface VertebraData {
    id: number;
    label: string;
    position: [number, number, number];
    rotation: [number, number, number];
    isHighlighted: boolean;
}

// Procedural Spine Chain
const CervicalSpine = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [flexion, setFlexion] = useState(0);

  useFrame((state) => {
    // Animate flexion based on time
    const t = state.clock.getElapsedTime();
    // Oscillate between 0 (neutral) and 1 (flexed) every 6 seconds
    const cycle = (Math.sin(t * 0.5) + 1) / 2;
    setFlexion(cycle);
  });

  // Generate C1-C7 positions based on flexion state
  const vertebrae = useMemo<VertebraData[]>(() => {
    const bones = [];
    const labels = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'T1'];
    
    // Base curvature parameters
    // Neutral: Lordosis (curved back)
    // Flexed: Kyphosis/Straight (curved forward)
    
    for (let i = 0; i < 8; i++) {
        // Calculate Y position (stacking down)
        const y = 2.5 - (i * 0.7);
        
        // Calculate Z and Rotation for Lordosis (Neutral)
        // Lordosis: Convex anteriorly (curves forward in middle) -> In our coord system, Z increases then decreases?
        // Let's simplify: 
        // Neutral: C-shape opening backwards.
        // Flexion: Straight or C-shape opening forwards.

        // Neutral Curve (Lordosis)
        const neutralZ = Math.sin((i / 7) * Math.PI) * -0.5; 
        const neutralRotX = (i - 3.5) * -0.15;

        // Flexed Curve (Kyphosis/Text Neck)
        // Head (C1) moves forward significantly
        const flexedZ = (Math.pow(i/7, 2)) * 1.5; // Top moves forward (Z+)
        const flexedRotX = (i / 7) * 0.8 + 0.2; // Angle down

        // Interpolate
        const currentZ = THREE.MathUtils.lerp(neutralZ, flexedZ, flexion);
        const currentRotX = THREE.MathUtils.lerp(neutralRotX, flexedRotX, flexion);
        
        // Upper segments (0,1,2 corresponding to C1, C2, C3) are most highlighted in paper
        const isHighlighted = i < 4 && flexion > 0.5;

        bones.push({
            id: i,
            label: labels[i],
            position: [0, y, currentZ] as [number, number, number],
            rotation: [currentRotX, Math.PI, 0] as [number, number, number], // Facing left/right
            isHighlighted
        });
    }
    return bones;
  }, [flexion]);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0, -Math.PI/2, 0]}>
      {vertebrae.map((v) => (
        <Vertebra 
            key={v.id} 
            position={v.position} 
            rotation={v.rotation} 
            label={v.label}
            isHighlighted={v.isHighlighted}
        />
      ))}
      
      {/* Connection Line (Spinal Cord approximation) */}
      <mesh>
        <bufferGeometry>
            <float32BufferAttribute 
                attach="attributes-position" 
                count={vertebrae.length} 
                array={new Float32Array(vertebrae.flatMap(v => [v.position[0], v.position[1], v.position[2]]))} 
                itemSize={3} 
            />
        </bufferGeometry>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.5} linewidth={2} />
      </mesh>
    </group>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} color="#e0f2fe" />
        <spotLight position={[-10, 5, 5]} intensity={0.5} color="#white" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <CervicalSpine />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const AnatomyScene: React.FC = () => {
    return (
      <div className="w-full h-full absolute inset-0">
        <Canvas camera={{ position: [4, 0, 0], fov: 45 }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <Environment preset="warehouse" />
          <Float rotationIntensity={0.5} floatIntensity={0.5}>
             <group rotation={[0, -Math.PI/2, 0]}>
                 <Vertebra position={[0, 1, 0]} rotation={[0.2, Math.PI, 0]} label="C1 (Atlas)" isHighlighted={true} />
                 <Vertebra position={[0, 0.2, -0.1]} rotation={[0.1, Math.PI, 0]} label="C2 (Axis)" isHighlighted={true} />
                 <Vertebra position={[0, -0.6, -0.15]} rotation={[0, Math.PI, 0]} label="C3" isHighlighted={true} />
             </group>
          </Float>
        </Canvas>
      </div>
    );
  }