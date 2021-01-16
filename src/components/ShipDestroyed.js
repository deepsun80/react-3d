import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useRecoilValue } from "recoil";
import { shipDestroyedState } from "../gameState";

function ShipDestroyed() {
 const shipDestroyed = useRecoilValue(shipDestroyedState);
 const destroyed = useRef();

 useFrame(() => {
   if (destroyed && destroyed.current) {
    destroyed.current.material.opacity -= 0.05;
    destroyed.current.scale.x += 0.05;
    destroyed.current.scale.y += 0.05;
    destroyed.current.scale.z += 0.05;
   }
 });

 return (
  <group>
     {shipDestroyed.map((ship, id) => (
       <mesh position={[ship.x, ship.y, ship.z]} key={`${id}`} ref={destroyed}>
         <sphereBufferGeometry attach="geometry" args={[2, 20,20]} />
         <meshStandardMaterial attach="material" color="red" transparent depthWrite={false} />
       </mesh>
     ))}
   </group>
 );
}

export default ShipDestroyed;