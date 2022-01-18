import { useRef, useMemo, createRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useRecoilValue } from "recoil";
import { shipDestroyedState } from "../gameState";
import * as THREE from 'three';

function make(color, speed) {
  return {
    ref: createRef(),
    color,
    data: new Array(8)
      .fill()
      .map(() => [
        new THREE.Vector3(),
        new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2).normalize().multiplyScalar(speed * 0.5)
      ])
  }
}

const dummy = new THREE.Object3D();

function ShipDestroyed() {
 const shipDestroyed = useRecoilValue(shipDestroyedState);

 return shipDestroyed.map((ship, id) => <Explosion key={`${id}`} position={ship} />);
}

function Explosion({position}) {
  const explosion = useRef();
  const particles = useMemo(() => [make('yellow', 0.8), make('red', 0.6)], []);

  useFrame(() => {
    if(explosion && explosion.current) {
      particles.forEach(({ data }, type) => {
        const mesh = explosion.current.children[type];
        data.forEach(([vec, normal], i) => {
          vec.add(normal)
          dummy.position.copy(vec)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
        })
        mesh.material.opacity -= 0.025
        mesh.instanceMatrix.needsUpdate = true
      })
    }
  });

  return (
    <group ref={explosion} position={[position.x, position.y, position.z]} scale={[0.25, 0.25, 0.25]}>
      {particles.map(({ color, data }, index) => (
        <instancedMesh key={index} args={[null, null, data.length]} frustumCulled={false}>
          <sphereBufferGeometry attach="geometry" args={[10, 10, 16]} />
          <meshBasicMaterial attach="material" color={color} transparent opacity={1} />
        </instancedMesh>
      ))}
    </group>
  );
}

export default ShipDestroyed;