import { useRecoilValue } from "recoil";
import { useLoader } from "react-three-fiber";
import { enemyPositionState } from "../gameState";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Enemies() {
 const enemies = useRecoilValue(enemyPositionState);

 const { nodes } = useLoader(GLTFLoader, "/SciFiSphere.glb");

 return (
     enemies.map((enemy, id) => (
      <group key={`${id}`} >
        <mesh position={[enemy.x, enemy.y, enemy.z]} scale={[2, 2, 2]} rotation={[0, enemy.yRotation, 0]} visible geometry={nodes.Low002_Cube015.geometry} material={nodes.Low002_Cube015.material}>
        </mesh>
      </group>
     ))
 );
}

export default Enemies;