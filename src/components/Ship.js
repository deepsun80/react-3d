import { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { useRecoilState, useRecoilValue } from "recoil";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { shipPositionState, gameOverState } from "../gameState";
import * as THREE from 'three';

const clock = new THREE.Clock(false);

function Ship() {
 const [shipPosition, setShipPosition] = useRecoilState(shipPositionState);
 const gameOver = useRecoilValue(gameOverState);

 const ship = useRef();
//  const exhaust = useRef();

 useFrame(({ mouse }) => {
   setShipPosition({
     position: { x: mouse.x * 4, y: mouse.y * 2, z: -4 },
     rotation: { x: -mouse.x * 0.1, y: -mouse.y * 0.1, z: -mouse.x * 0.5 }
   });

  //  exhaust.current.scale.x = 1 + Math.sin(clock.getElapsedTime() * 200);
  //  exhaust.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 200);
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
   <group ref={ship} scale={[0.5, 0.5, 0.5]}>
     <mesh visible geometry={nodes.StarSparrow09.geometry} material={nodes.StarSparrow09.material}>
     </mesh>
     {/* <mesh ref={exhaust} scale={[1, 1, 30]} position={[0, 1, 30]}>
        <dodecahedronBufferGeometry attach="geometry" args={[1.5, 0]} />
        <meshBasicMaterial attach="material" color="lightblue" />
     </mesh> */}
   </group> : null
 );
}

export default Ship;