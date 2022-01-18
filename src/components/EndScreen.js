import { useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import StarsBackground from './StarsBackground';
import Effects from './Effects';
import fonts from '../fonts';

function EndScreen() {
 const [didMount, setDidMount] = useState(false); 

 useEffect(() => {
  setDidMount(true);
  return () => setDidMount(false);
  }, []);

 return (
   didMount ? 
    <>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={1.0} castShadow position={[0, 0, 1]} />
      <Text
        color="white"
        scale={[3.5, 3.5]}
        position-z={1}
        position-y={1.75}
        font={fonts.Orbitron}
      >
        CONGRATULATIONS!
      </Text>
      <Text
        color="white"
        scale={[2.5, 2.5]}
        position-z={1}
        position-y={1.0}
        font={fonts.Roboto}
        lineHeight={2.25}
        maxWidth={2.5}
      >
        You have eliminated the mines.
      </Text>
      <Text
        color="white"
        scale={[2.5, 2.5]}
        position-z={1}
        position-y={0.65}
        font={fonts.Roboto}
        lineHeight={2.25}
        maxWidth={2.5}
      >
        Thank you for playing Venus Minefield.
      </Text>
      <Text
        color="white"
        scale={[1.75, 1.75]}
        position-z={1}
        position-y={-0.5}
        font={fonts.Roboto}
        lineHeight={1.75}
        maxWidth={2.5}
      >
        Game Developed by Sandeep Chandran
      </Text>
      <Text
        color="white"
        scale={[1.10, 1.10]}
        position-z={1}
        position-y={-1.10}
        font={fonts.Roboto}
        lineHeight={1.65}
        maxWidth={2.5}
      >
        Assets purchased from CGTrader (https://www.cgtrader.com/) Royalty Free License. Planet textures from Solar System Scope (https://www.solarsystemscope.com/).
      </Text>
      <StarsBackground speed={0.005} />
      <Effects brightness={0.7} />
    </> : null
 );
}

export default EndScreen;