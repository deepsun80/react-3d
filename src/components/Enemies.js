import { useRecoilValue } from "recoil";
import { enemyPositionState } from "../gameState";

// Manages Drawing enemies that currently exist in state
function Enemies() {
 const enemies = useRecoilValue(enemyPositionState);
 return (
   <group>
     {enemies.map((enemy, id) => (
       <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`}>
         <sphereBufferGeometry attach="geometry" args={[2, 8, 8]} />
         <meshStandardMaterial attach="material" color="white" wireframe />
       </mesh>
     ))}
   </group>
 );
}

export default Enemies;