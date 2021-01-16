import { useRecoilValue } from "recoil";
import { missedEnemiesState } from "../gameState";
import { Text } from 'drei';

function MissedText({ txtPos }) {
 const missed = useRecoilValue(missedEnemiesState);

 return (
  <Text
   color="white" // default
   position-y={txtPos.y}
   position-x={-txtPos.x}
   scale={[3, 3]}
  >
   Missed: {missed.length}
  </Text>
 );
}

export default MissedText;