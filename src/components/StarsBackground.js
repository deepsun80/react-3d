import { useMemo, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

/** This component rotates a bunch of stars */
function StarsBackground() {
 let group = useRef();
 let theta = 0;

 useFrame(() => {
  const r = .2 * Math.sin(THREE.Math.degToRad((theta += 0.01)))
   const s = .02 * Math.cos(THREE.Math.degToRad(theta * 2));

   group.current.scale.set(s, s, s);
   group.current.rotation.set(r, r, r);
 });

 const [geo, mat, coords] = useMemo(() => {
   const geo = new THREE.SphereBufferGeometry(1, 10, 10)
   const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('white'), transparent: true })
   const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400])
   return [geo, mat, coords]
 }, []);

 return (
   <group ref={group}>
     {coords.map(([p1, p2, p3], i) => (
       <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
     ))}
   </group>
 );
}

export default StarsBackground;