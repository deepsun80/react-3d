import * as THREE from 'three';
import { useRef } from "react";
import { useFrame } from "react-three-fiber";

// Draws two sprites in front of the ship, indicating the direction of fire.
// Uses a TextureLoader to load transparent PNG, and sprite to render on a 2d plane facing the camera.
function Target() {
 // Create refs for the two sprites we will create.
 const rearTarget = useRef();
 const frontTarget = useRef();

 const loader = new THREE.TextureLoader();
 // A png with transparency to use as the target sprite.
 const texture = loader.load("/target.png");

 // Update the position of both sprites based on the mouse x and y position. The front target has a larger scalar.
 // Its movement in both axis is exagerated since its farther in front. The end result should be the appearance that the
 // two targets are aligned with the ship in the direction of laser fire.
 useFrame(({ mouse }) => {
   rearTarget.current.position.y = -mouse.y * 10;
   rearTarget.current.position.x = -mouse.x * 30;

   frontTarget.current.position.y = -mouse.y * 20;
   frontTarget.current.position.x = -mouse.x * 60;
 });
 // Return a group containing two sprites. One positioned eight units in front of the ship, and the other 16 in front.
 // We give the spriteMaterial a map prop with the loaded sprite texture as a value/
 return (
   <group>
     <sprite position={[0, 0, -8]} ref={rearTarget}>
       <spriteMaterial attach="material" map={texture} />
     </sprite>
     <sprite position={[0, 0, -16]} ref={frontTarget}>
       <spriteMaterial attach="material" map={texture} />
     </sprite>
   </group>
 );
}

export default Target;