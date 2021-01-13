import { useRecoilValue } from "recoil";
import { enemyDestroyedState } from "../gameState";

// Manages Drawing enemies that currently exist in state
function EnemiesDestroyed() {
 const enemiesDestroyed = useRecoilValue(enemyDestroyedState);
 
 return (
   <group>
     {enemiesDestroyed.map((enemy, id) => (
       <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`}>
         <sphereBufferGeometry attach="geometry" args={[2, 20,20]} />
         <meshStandardMaterial attach="material" color="red" wireframe />
       </mesh>
     ))}
   </group>
 );
}

export default EnemiesDestroyed;