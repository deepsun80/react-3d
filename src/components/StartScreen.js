import { useState, useEffect } from 'react';
import { Text, Box } from 'drei';

function StartScreen({ setGame, level, setNewLevel }) {
 const [hovered, setHover] = useState(false);
 // const [didMount, setDidMount] = useState(false); 

 const hover = event => setHover(true);
 const unhover = event =>  setHover(false);

//  useEffect(() => {
//   setDidMount(true);
//   return () => setDidMount(false);
//   }, [])

  const startGame = () => {
    setGame(true);
    setNewLevel(true);
  }

 return (
   // didMount ? 
    <>
    <group onPointerOver={hover} onPointerOut={unhover} onClick={startGame}>
      <Text
        color="white"
        scale={[1.5, 1.5]}
        position-z={1}
        position-y={0.5}
      >
        LEVEL {level.toString()}
      </Text>
      <Text
        color={hovered ? "white" : "black"}
        scale={[1.5, 1.5]}
        position-z={1}
      >
        START
      </Text>
      <Box args={[1, 0.5, 1]}>
        <meshBasicMaterial attach="material" color={hovered ? "grey" : "white"} />
      </Box>
      </group>
    </>
 );
}

export default StartScreen;