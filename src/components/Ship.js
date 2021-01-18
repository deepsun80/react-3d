import { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { useRecoilState, useRecoilValue } from "recoil";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { shipPositionState, gameOverState } from "../gameState";
import * as THREE from 'three';

function Ship() {
 const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);
 const gameOver = useRecoilValue(gameOverState);

 const ship = useRef();
 useFrame(({ mouse }) => {
   setShipPosition({
     position: { x: mouse.x * 6, y: mouse.y * 2, z: 0 },
     rotation: { x: -mouse.x * 0.5, y: -mouse.y * 0.2, z: -mouse.x * 0.5 }
   });
 });

 useFrame(() => {
   if (ship && ship.current) {
    ship.current.rotation.z = shipPosition.rotation.z;
    ship.current.rotation.y = shipPosition.rotation.x - THREE.Math.degToRad(180);
    ship.current.rotation.x = shipPosition.rotation.y;
    ship.current.position.y = shipPosition.position.y;
    ship.current.position.x = shipPosition.position.x;
    ship.current.position.z = shipPosition.position.z;
   }
 });

 const { nodes } = useLoader(GLTFLoader, "/StarSparrow09.glb");

 return (
   !gameOver ? 
   <group ref={ship} scale={[0.3, 0.3, 0.3]}>
     <mesh visible geometry={nodes.StarSparrow09.geometry} material={nodes.StarSparrow09.material}>
     </mesh>
   </group> : null
 );
}

export default Ship;