import { useRef } from 'react';
import { useFrame } from "react-three-fiber";

function StarsForeground() {
 const ref = useRef();

 useFrame(() => {
   ref.current.position.z += 0.3;

   let i = 0;
   for (let x = 0; x < 10000; x ++) {
         const id = i++;
         tempObject.position.set(Math.random() * 100 - 50, Math.random() * 50 - 25, x * 2 - 1000);
         tempObject.updateMatrix();
         ref.current.setMatrixAt(id, tempObject.matrix);
       }
 });

 return (
   <instancedMesh ref={ref} args={[null, null, 1000]}>
     <boxBufferGeometry attach="geometry" args={[0.2, 0.2, 12.0]} />
     <meshStandardMaterial attach="material" color="white" />
   </instancedMesh>
 );
}

export default StarsForeground;