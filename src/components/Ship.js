import { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { useRecoilState } from "recoil";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { shipPositionState } from "../gameState";

function Ship() {
 const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);

 const ship = useRef();
 useFrame(({ mouse }) => {
   setShipPosition({
     position: { x: mouse.x * 6, y: mouse.y * 2, z: 0 },
     rotation: { x: -mouse.x * 0.5, y: -mouse.y * 0.2, z: -mouse.x * 0.5 }
   });
 });
 // Update the ships position from the updated state.
 useFrame(() => {
   if (ship && ship.current) {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x;
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
    ship.current.position.z = shipPosition.position.z;
   }
 });

 const { nodes } = useLoader(GLTFLoader, "/arwing.glb");

 return (
   <group ref={ship}>
     <mesh visible geometry={nodes.Default.geometry}>
       <meshStandardMaterial
         attach="material"
         color="white"
         roughness={1}
         metalness={0}
       />
     </mesh>
   </group>
 );
}

export default Ship;