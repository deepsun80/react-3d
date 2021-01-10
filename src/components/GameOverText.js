import { useRecoilValue } from "recoil";
import { gameState } from "../gameState";
import { Text } from 'drei';

// Draws all of the lasers existing in state.
function MissedText() {
 const gameOver = useRecoilValue(gameState);

 return (
  gameOver && 
   <Text
    color="red" // default
    scale={[5, 5]}
    position-z={1}
   >
    GAME OVER
   </Text>
 );
}

export default MissedText;