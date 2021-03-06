import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarsBackground({ speed }) {
 let group = useRef();
 let theta = 0;

 useFrame(() => {
  // const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
   const s = .02 * Math.cos(THREE.Math.degToRad(theta * 2));

   if (group && group.current) {
    group.current.scale.set(s, s, s);
    group.current.position.z += speed;
   }
 });

   const [geo, mat, coords] = useMemo(() => {
   const geo = new THREE.SphereBufferGeometry(2, 10, 10)
   const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('white'), transparent: true })
   const coords = new Array(800).fill().map(i => [Math.random() * 1400 - 700, Math.random() * 1400 - 700, Math.random() * 4000 - 2000]);
   return [geo, mat, coords]
 }, []);

 return (
   <group ref={group} position={[0, 0, -20]}>
     {coords.map(([p1, p2, p3], i) => (
       <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
     ))}
   </group>
 );
}

export default StarsBackground;