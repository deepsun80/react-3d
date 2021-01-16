import { useRef } from 'react';
import { useFrame } from "react-three-fiber";
import * as THREE from 'three';

const star = new THREE.Object3D();

function StarsForeground() {
 const ref = useRef();

 useFrame(() => {
   ref.current.position.z += 0.3;

   let i = 0;
   for (let x = 0; x < 500; x ++) {
         const id = i++;
         star.position.set(Math.random() * 200 - 100, Math.random() * 200 - 100, x * 2 - 1000);
         star.updateMatrix();
         ref.current.setMatrixAt(id, star.matrix);
       }
 });

 return (
   <instancedMesh ref={ref} args={[null, null, 500]}>
     <boxBufferGeometry attach="geometry" args={[0.5, 0.5, 12.0]} />
     <meshStandardMaterial attach="material" color="white" />
   </instancedMesh>
 );
}

export default StarsForeground;