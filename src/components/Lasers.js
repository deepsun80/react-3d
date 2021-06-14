import { useRecoilValue } from "recoil";
import { laserPositionState, gameOverState } from "../gameState";

function Lasers() {
 const lasers = useRecoilValue(laserPositionState);
 const gameOver = useRecoilValue(gameOverState);

 return (
   !gameOver ? 
   <group>
     {lasers.map((laser) => (
       <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
         <sphereBufferGeometry attach="geometry" args={[0.5, 12, 12]} />
         <meshStandardMaterial attach="material" color="yellow" />
       </mesh>
     ))}
   </group> : null
 );
}

export default Lasers;