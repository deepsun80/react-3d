import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { useRecoilValue } from "recoil";
import { enemyDestroyedState } from "../gameState";

function EnemiesDestroyed() {
 const enemiesDestroyed = useRecoilValue(enemyDestroyedState);

 const enemyDestroyed = useRef();

 useFrame(() => {
   if (enemyDestroyed && enemyDestroyed.current) {
    enemyDestroyed.current.material.opacity -= 0.05;
    enemyDestroyed.current.scale.x += 0.05;
    enemyDestroyed.current.scale.y += 0.05;
    enemyDestroyed.current.scale.z += 0.05;
   }
 });

 return (
   <group>
     {enemiesDestroyed.map((enemy, id) => (
       <mesh position={[enemy.x, enemy.y, enemy.z]} key={`${id}`} ref={enemyDestroyed}>
         <sphereBufferGeometry attach="geometry" args={[2, 20,20]} />
         <meshStandardMaterial attach="material" color="red" transparent depthWrite={false} />
       </mesh>
     ))}
   </group>
 );
}

export default EnemiesDestroyed;