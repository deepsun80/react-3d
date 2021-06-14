import { Text } from 'drei';
import fonts from '../fonts';

function MissedText() {
 return (
   <Text
    color="white"
    scale={[3.5, 3.5]}
    position-z={1}
    font={fonts.Orbitron}
   >
    LOADING...
   </Text>
 );
}

export default MissedText;