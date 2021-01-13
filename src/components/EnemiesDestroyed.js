import { useState } from 'react';
import { useRecoilValue } from "recoil";
import { enemyDestroyedState } from "../gameState";

// Manages Drawing enemies that currently exist in state
function EnemiesDestroyed() {
 const [opacity, setOpacity] = useState(1.0);
 const enemiesDestroyed = useRecoilValue(enemyDestroyedState);

 setTimeout(() => {
   setOpacity(0.0);
 }, 10000);
 
 return (
   <group>
     {enemiesDestroyed.map((enemy, id) => (
       <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`}>
         <sphereBufferGeometry attach="geometry" args={[2, 20,20]} />
         <meshStandardMaterial opacity={0} attach="material" color="red" wireframe />
       </mesh>
     ))}
   </group>
 );
}

export default EnemiesDestroyed;