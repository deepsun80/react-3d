import { useRecoilValue } from "recoil";
import { enemyPositionState } from "../gameState";

function Enemies() {
 const enemies = useRecoilValue(enemyPositionState);
 return (
   <group>
     {enemies.map((enemy, id) => (
       <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`}>
         <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
         <meshStandardMaterial attach="material" color="white" />
       </mesh>
     ))}
   </group>
 );
}

export default Enemies;