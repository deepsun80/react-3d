import { useRecoilValue } from "recoil";
import { scoreState } from "../gameState";
import { Text } from 'drei';

// Draws all of the lasers existing in state.
function ScoreText({ txtPos }) {
 const score = useRecoilValue(scoreState);
 
 return (
  <Text
   color="white" // default
   position-y={txtPos.y}
   position-x={txtPos.x}
   scale={[3, 3]}
  >
   Score: {score}
  </Text>
 );
}

export default ScoreText;