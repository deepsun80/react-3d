import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useRecoilValue } from "recoil";
import { gameOverState } from "../gameState";

function Target() {
  const gameOver = useRecoilValue(gameOverState);

 const rearTarget = useRef();
 const frontTarget = useRef();

 const loader = new THREE.TextureLoader();
 const texture = loader.load("/target.png");

  useFrame(({ mouse }) => {
   if (rearTarget && rearTarget.current) {
    rearTarget.current.position.y = -mouse.y * 10;
    rearTarget.current.position.x = -mouse.x * 30;
   }
   if (frontTarget && frontTarget.current) {
    frontTarget.current.position.y = -mouse.y * 20;
    frontTarget.current.position.x = -mouse.x * 60;
   }
 });

 return (
   !gameOver ? <group>
     <sprite position={[0, 0, -8]} ref={rearTarget}>
       <spriteMaterial attach="material" map={texture} />
     </sprite>
     <sprite position={[0, 0, -16]} ref={frontTarget}>
       <spriteMaterial attach="material" map={texture} />
     </sprite>
   </group> : null
 );
}

export default Target;