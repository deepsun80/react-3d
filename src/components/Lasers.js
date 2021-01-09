import { useRecoilValue } from "recoil";
import { laserPositionState } from "../gameState";

// Draws all of the lasers existing in state.
function Lasers() {
 const lasers = useRecoilValue(laserPositionState);
 return (
   <group>
     {lasers.map((laser) => (
       <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
         <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
         <meshStandardMaterial attach="material" emissive="white" />
       </mesh>
     ))}
   </group>
 );
}

export default Lasers;