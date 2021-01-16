import { Text } from 'drei';

function MissedText() {
 return (
   <Text
    color="red"
    scale={[5, 5]}
    position-z={1}
   >
    GAME OVER
   </Text>
 );
}

export default MissedText;