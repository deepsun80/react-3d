import { useState, useEffect } from 'react';
import { Text, RoundedBox } from 'drei';
import StarsBackground from './StarsBackground';
import fonts from '../fonts';

function StartScreen({ setGame, level, setNewLevel }) {
 const [hovered, setHover] = useState(false);
 const [didMount, setDidMount] = useState(false); 

 const hover = event => setHover(true);
 const unhover = event =>  setHover(false);

 useEffect(() => {
  setDidMount(true);
  return () => setDidMount(false);
  }, [])

  const startGame = () => {
    setGame(true);
    setNewLevel(true);
  }

 return (
   didMount ? 
    <>
    <group onPointerOver={hover} onPointerOut={unhover} onClick={startGame}>
      <Text
        color="white"
        scale={[1.5, 1.5]}
        position-z={1}
        position-y={0.5}
        font={fonts.Orbitron}
      >
        LEVEL {level.toString()}
      </Text>
      <Text
        color={hovered ? "white" : "black"}
        scale={[1.5, 1.5]}
        position-z={1}
        font={fonts.Orbitron}
      >
        START
      </Text>
      <RoundedBox args={[1, 0.5, 1]}>
        <meshBasicMaterial attach="material" color={hovered ? "grey" : "white"} />
      </RoundedBox>
      <StarsBackground speed={0.005} />
      </group>
    </> : null
 );
}

export default StartScreen;