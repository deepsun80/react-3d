import { Text } from 'drei';
import fonts from '../fonts';

function MissedText() {
 return (
   <Text
    color="white"
    scale={[5, 5]}
    position-z={1}
    font={fonts.Orbitron}
   >
    GAME OVER
   </Text>
 );
}

export default MissedText;