import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Cube() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4ade80" />
    </mesh>
  );
}

export default Cube;
