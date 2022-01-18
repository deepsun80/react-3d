import { useRecoilValue } from "recoil";
import { missedEnemiesState } from "../gameState";
import { Text } from '@react-three/drei';
import fonts from '../fonts';

function MissedText({ txtPos }) {
 const missed = useRecoilValue(missedEnemiesState);

 return (
  <group>
   <Text
    color="white"
    position-y={txtPos.y}
    position-x={-txtPos.x}
    scale={[3, 3]}
    font={fonts.Orbitron}
   >
    Missed: {missed.length}
   </Text>
  </group>
 );
}

export default MissedText;