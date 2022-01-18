import { useRecoilValue } from "recoil";
import { scoreState } from "../gameState";
import { Text } from '@react-three/drei';
import fonts from '../fonts';

function ScoreText({ txtPos }) {
 const score = useRecoilValue(scoreState);
 
 return (
  <Text
   color="white" // default
   position-y={txtPos.y}
   position-x={txtPos.x}
   scale={[3, 3]}
   font={fonts.Orbitron}
  >
   Score: {score}
  </Text>
 );
}

export default ScoreText;