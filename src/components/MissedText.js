import { useRecoilValue } from "recoil";
import { missedEnemiesState } from "../gameState";
import { Text } from 'drei';

// Draws all of the lasers existing in state.
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