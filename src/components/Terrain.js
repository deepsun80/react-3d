import { useRef } from "react";
import { useFrame } from "react-three-fiber";

// A Ground plane that moves relative to the player. The player stays at 0,0
function Terrain({ groundSpeed, groundHeight }) {
 const terrain = useRef();

 useFrame(() => {
   if (terrain && terrain.current) 
    terrain.current.position.z += groundSpeed;
 });

 return (
   <mesh
     visible
     position={[0, groundHeight, 0]}
     rotation={[-Math.PI / 2, 0, 0]}
     ref={terrain}
   >
     <planeBufferGeometry attach="geometry" args={[5000, 5000, 128, 128]} />
     <meshStandardMaterial
       attach="material"
       color="white"
       roughness={1}
       metalness={0}
       wireframe
     />
   </mesh>
 );
}

export default Terrain;